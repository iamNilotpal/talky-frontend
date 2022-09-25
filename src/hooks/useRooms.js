import { useEffect, useState } from 'react';

import { fetchRooms } from '../api/room-service';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await fetchRooms();
        if (data) {
          setError(null);
          setRooms(data.rooms);
        }
      } catch (e) {
        setError(e?.response.data.message || e.message);
      }
    })();
  }, []);

  return { rooms, error };
};
