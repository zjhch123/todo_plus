import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useAPI(payloadGenerator) {
  const [status, setStatus] = useState({
    response: null,
    isLoading: null,
    isError: null,
  });
  const [cancelToken, setCancelToken] = useState(null);

  useEffect(() => {
    return () => {
      cancelToken && cancelToken.cancel && cancelToken.cancel();
    };
  }, [cancelToken]);

  const execute = useCallback((...args) => {
    setStatus({
      isLoading: true,
      isError: false,
      response: null,
    });

    const source = axios.CancelToken.source();

    const fetchInstance = axios({
      ...payloadGenerator(...args),
      cancelToken: source.token,
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.status);
        }

        return response;
      }).then(response => {
        setStatus({
          isLoading: false,
          isError: false,
          response: response.data,
        });
        return response.data;
      }).catch(e => {
        if (axios.isCancel(e)) {
          return;
        }

        setStatus({
          isLoading: false,
          isError: true,
          response: null,
        });
        throw e;
      });
    
    
    setCancelToken(source);
    return fetchInstance;
  }, [payloadGenerator]);

  return [status.response, execute, status.isLoading, status.isError];
}
