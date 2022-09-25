import { useCallback, useEffect, useRef } from 'react';

import { toastifyErrorMessage } from '../utils';
import { useStateWithCallback } from './useStateWithCallback';

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  // const peerConnections = useRef({});
  const localMediaStream = useRef(null);

  const updateAudioRef = (instance, clientId) =>
    (audioElements.current[clientId] = instance);

  const addNewClient = useCallback(
    (newClient, cb) => {
      const doesExist = clients.find((c) => c.id === newClient.id);
      if (!doesExist)
        setClients((prevClients) => [...prevClients, newClient], cb);
    },
    [clients, setClients],
  );

  useEffect(() => {
    (async function () {
      try {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        addNewClient(user, () => {
          const localElement = audioElements.current[user.id];
          if (localElement) {
            localElement.volume = 0;
            localElement.srcObject = localMediaStream.current;
          }
        });
      } catch (error) {
        toastifyErrorMessage('Permission denied.');
      }
    })();
  }, [user, addNewClient]);

  return { clients, updateAudioRef };
};
