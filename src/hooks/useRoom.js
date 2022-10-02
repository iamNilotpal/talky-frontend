import { useEffect, useState } from 'react';
import { fetchRoomData } from '../services/api/room-service';

export const useRoom = (roomId) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await fetchRoomData(roomId);
        if (data.ok) setRoom(data.room);
      } catch (error) {
        const { response } = error;
        setError(response?.data || { message: 'Something went wrong' });
      } finally {
        setLoading(false);
      }
    })();
  }, [roomId]);

  return { room, error, loading };
};
