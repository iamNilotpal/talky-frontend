/* eslint-disable react-hooks/exhaustive-deps */
import freeIceServers from 'freeice';
import { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { initSocket } from '../services/socket';
import { SOCKET_EVENTS } from '../services/socket/events';
import { toastifyErrorMessage } from '../utils';
import { useStateWithCallback } from './useStateWithCallback';

export const useWebRTC = (roomId, user) => {
  const socket = useRef();
  const history = useHistory();
  const audioElements = useRef({}); // TO STORE THE AUDIO ELEMENTS
  const peerConnections = useRef({}); // TO STORE ALL THE CONNECTED PEERS
  const localMediaStream = useRef(null); // TO STORE CURRENT USER LOCAL MEDIA STREAM
  const [clients, setClients] = useStateWithCallback([]); // TO STORE ALL CLIENTS

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

  useEffect(() => {
    // INITIALIZING SOCKET CONNECTION
    socket.current = initSocket();

    // WASTED MY 18 HOURS
    // HANDLE REMOVE CLIENT
    const handleRemovePeer = async ({ peerId, userId }) => {
      if (userId !== user.id && peerId !== socket.current.id) {
        await peerConnections.current[peerId].close();
        delete peerConnections.current[peerId];
        delete audioElements.current[userId];
        setClients((prev) => prev.filter((client) => client.id !== userId));
      } else {
        setClients((prev) => prev.filter((client) => client.id !== userId));
        Object.values(peerConnections.current).forEach(
          async (connection) => await connection.close()
        );
        history.push('/rooms');
      }
    };

    socket.current.on(SOCKET_EVENTS.REMOVE_PEER, handleRemovePeer);
    return () => {
      socket.current.off(SOCKET_EVENTS.REMOVE_PEER, handleRemovePeer);
      socket.current.disconnect();
    };
  }, []);

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
  }, []);

  // LISTENING FOR ADD_PEER EVENT. IT WILL BE EMITTED WHEN NEW PEER JOINS THE ROOM.
  useEffect(() => {
    const handleAddPeer = async ({ peerId, createOffer, remoteUser }) => {
      // FIRST INITIALIZE A PEER CONNECTION WITH THE CURRENT "SOCKET ID" AND ADD IT TO THE PEER CONNECTIONS LIST.
      if (!peerConnections.current[peerId]) {
        peerConnections.current[peerId] = new RTCPeerConnection({
          iceServers: freeIceServers(),
        });
      }

      const currentPeerConnection = peerConnections.current[peerId];
      // HANDLE NEW ICE CANDIDATE.
      currentPeerConnection.onicecandidate = (e) => {
        socket.current.emit(SOCKET_EVENTS.RELAY_ICE, {
          peerId,
          icecandidate: e.candidate,
        });
      };

      // HANDLE "ontrack" WHEN USER STARTS STREAMING
      currentPeerConnection.ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;

            const settledInterval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) clearInterval(settledInterval);
            }, 1000);
            if (settled) clearInterval(settledInterval);
          }
        });
      };

      // ADD LOCAL TRACK TO PEER CONNECTION SO THAT OTHER CAN LISTEN TO THE CURRENT PEER
      localMediaStream.current.getTracks().forEach(async (track) => {
        await currentPeerConnection.addTrack(track, localMediaStream.current);
      });

      // CREATE OFFER
      if (createOffer) {
        // CREATE AN OFFER AND SEND OFFER TO THE OTHER CLIENTS
        const offer = await currentPeerConnection.createOffer();
        await currentPeerConnection.setLocalDescription(offer);
        socket.current.emit(SOCKET_EVENTS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };

    socket.current.on(SOCKET_EVENTS.ADD_PEER, handleAddPeer);
    return () => {
      socket.current.off(SOCKET_EVENTS.ADD_PEER, handleAddPeer);
    };
  }, []);

  // HANDLING ICE CANDIDATE FROM SERVER
  useEffect(() => {
    const handleIceCandidate = async ({ peerId, icecandidate }) => {
      if (icecandidate)
        await peerConnections.current[peerId]?.addIceCandidate(icecandidate);
    };

    socket.current.on(SOCKET_EVENTS.ICE_CANDIDATE, handleIceCandidate);
    return () => {
      socket.current.off(SOCKET_EVENTS.ICE_CANDIDATE, handleIceCandidate);
    };
  }, []);

  // HANDLING ICE SDP FROM SERVER
  useEffect(() => {
    const handleSDP = async ({ peerId, sessionDescription }) => {
      const connection = peerConnections.current[peerId];
      await connection?.setRemoteDescription(
        new RTCSessionDescription(sessionDescription)
      );

      // CREATE OFFER IF TYPEOF SESSION DESCRIPTION IS "OFFER"
      if (sessionDescription.type === 'offer') {
        const answer = await connection?.createAnswer();
        await connection.setLocalDescription(answer);
        socket.current.emit(SOCKET_EVENTS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socket.current.on(SOCKET_EVENTS.SESSION_DESCRIPTION, handleSDP);
    return () => {
      socket.current.off(SOCKET_EVENTS.SESSION_DESCRIPTION, handleSDP);
    };
  }, []);

  return { clients, updateAudioRef, socket: socket.current };
};
