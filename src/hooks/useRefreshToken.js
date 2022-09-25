import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { api } from '../api';
import { setAuth } from '../store/authSlice';

export const useRefreshToken = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (function () {
      api
        .get('/refresh-tokens')
        .then(({ data }) => dispatch(setAuth(data.user)))
        .catch(({ response }) => response)
        .finally(() => setLoading(false));
    })();
  }, [dispatch]);

  return loading;
};
