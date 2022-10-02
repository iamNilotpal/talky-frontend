import freeIceServers from 'freeice';
import { useCallback, useEffect, useRef } from 'react';

import { initSocket } from '../services/socket';
import { SOCKET_EVENTS } from '../services/socket/events';
import { toastifyErrorMessage } from '../utils';
import { useStateWithCallback } from './useStateWithCallback';

export const useWebRTC = (roomId, user) => {
  const socket = useRef();
  const audioElements = useRef({}); // TO STORE THE AUDIO ELEMENTS
  const settledInterval = useRef();
  const peerConnections = useRef({}); // TO STORE ALL THE CONNECTED PEERS
  const peerConnection = useRef(null); // CURRENT PEER
  const localMediaStream = useRef(null); // TO STORE CURRENT USER LOCAL MEDIA STREAM
  const [clients, setClients] = useStateWithCallback([]); // TO STORE ALL CLIENTS

  // console.log('Socket', socket);
  // console.log('AUDIO ELEMENTS', { audioElements: audioElements.current });
  // console.log('PEER CONNECTIONS', { peerConnections: peerConnections.current });

  // GETTING THE AUDIO INSTANCE OF THE CURRENT USER
  const updateAudioRef = (instance, clientId) =>
    (audioElements.current[clientId] = instance);

  // ADDING THE CURRENT USER IF NOT PRESENT
  const addNewClient = useCallback(
    (newClient, cb) => {
      const doesExist = clients.find((c) => c.id === newClient.id);
      if (!doesExist)
        setClients((prevClients) => [...prevClients, newClient], cb);
    },
    [clients, setClients]
  );

  // INITIALIZING SOCKET CONNECTION
  useEffect(() => {
    socket.current = initSocket();
  }, []);

  // LISTENING FOR ADD_PEER EVENT. IT WILL BE EMITTED WHEN NEW PEER JOINS THE ROOM.
  useEffect(() => {
    socket.current.on(
      SOCKET_EVENTS.ADD_PEER,
      async ({ peerId, createOffer, remoteUser }) => {
        // IF THE PEER IS ALREADY ADDED DON'T DO ANYTHING
        if (peerConnections.current[peerId]) {
          console.log(`${remoteUser} is already connected.`);
          return;
        }

        // FIRST INITIALIZE A PEER CONNECTION WITH THE CURRENT "SOCKET ID" AND ADD IT TO THE PEER CONNECTIONS LIST.
        peerConnections.current[peerId] = new RTCPeerConnection({
          iceServers: freeIceServers(),
        });
        peerConnection.current = peerConnections.current[peerId];

        // HANDLE NEW ICE CANDIDATE.
        peerConnection.current.onicecandidate = (e) => {
          socket.current.emit(SOCKET_EVENTS.RELAY_ICE, {
            peerId,
            icecandidate: e.candidate,
          });
        };

        // HANDLE "ontrack" WHEN USER STARTS STREAMING
        peerConnection.current.ontrack = ({ streams: [remoteStream] }) => {
          addNewClient(remoteUser, () => {
            if (audioElements.current[remoteUser.id])
              audioElements.current[remoteUser.id].srcObject = remoteStream;
            else {
              let settled = false;
              settledInterval.current = setInterval(() => {
                if (audioElements.current[remoteUser.id]) {
                  audioElements.current[remoteUser.id].srcObject = remoteStream;
                  settled = true;
                }
                if (settled) clearInterval(settledInterval.current);
              }, 1000);
            }
            console.log(audioElements.current[remoteUser.id]);
          });
        };

        // ADD LOCAL TRACK TO PEER CONNECTION SO THAT OTHER CAN LISTEN TO THE CURRENT PEER
        localMediaStream.current.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, localMediaStream.current);
        });

        // CREATE OFFER
        if (createOffer) {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          // SEND OFFER TO THE OTHER CLIENTS
          socket.current.emit(SOCKET_EVENTS.RELAY_SDP, {
            peerId,
            sessionDescription: offer,
          });
        }
      }
    );

    return () => {
      clearInterval(settledInterval.current);
      socket.current.off(SOCKET_EVENTS.ADD_PEER);
    };
  }, [addNewClient]);

  // HANDLING ICE CANDIDATE FROM SERVER
  useEffect(() => {
    socket.current.on(
      SOCKET_EVENTS.ICE_CANDIDATE,
      ({ peerId, icecandidate }) => {
        if (icecandidate) peerConnection.current.addIceCandidate(icecandidate);
      }
    );

    return () => socket.current.off(SOCKET_EVENTS.ICE_CANDIDATE);
  }, []);

  // HANDLING ICE SDP FROM SERVER
  useEffect(() => {
    socket.current.on(
      SOCKET_EVENTS.SESSION_DESCRIPTION,
      async ({ peerId, sessionDescription }) => {
        const connection = peerConnection.current;
        connection.setRemoteDescription(
          new RTCSessionDescription(sessionDescription)
        );

        // CREATE OFFER IF TYPEOF SESSION DESCRIPTION IS "OFFER"
        if (sessionDescription.type === 'offer') {
          const answer = await connection.createAnswer();
          await connection.setLocalDescription(answer);
          socket.current.emit(SOCKET_EVENTS.RELAY_SDP, {
            peerId,
            sessionDescription: answer,
          });
        }
      }
    );

    return () => socket.current.off(SOCKET_EVENTS.SESSION_DESCRIPTION);
  }, []);

  // HANDLE REMOVE CLIENT
  useEffect(() => {
    socket.current.on(SOCKET_EVENTS.REMOVE_PEER, async ({ peerId, userId }) => {
      if (peerConnections.current[peerId]) {
        await peerConnections.current[peerId].close();
        delete peerConnections.current[peerId];
        delete audioElements.current[userId];
        setClients((prev) => prev.filter((client) => client.id !== userId));
      }
    });

    return () => socket.current.off(SOCKET_EVENTS.REMOVE_PEER);
  }, [setClients]);

  // HANDLE USER MEDIA CAPTURE
  useEffect(() => {
    (async function () {
      try {
        // GET USER AUDIO DEVICE
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // ADD THE USER TO CURRENT USERS LIST
        // THEN GET THE LOCAL MEDIA STREAM OF THE USER AND SET THE VOLUME TO "0" SO IT DOESN'T ECHO AND THEN EMIT "JOIN" EVENT
        addNewClient(user, () => {
          const localElement = audioElements.current[user.id];
          if (localElement) {
            localElement.volume = 0;
            localElement.srcObject = localMediaStream.current;
          }
          socket.current.emit(SOCKET_EVENTS.JOIN, { user, roomId });
        });
      } catch (error) {
        toastifyErrorMessage('Permission denied.');
      }
    })();

    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.current.emit(SOCKET_EVENTS.LEAVE, { roomId });
    };
  }, [user, addNewClient, roomId]);

  return { clients, updateAudioRef };
};
