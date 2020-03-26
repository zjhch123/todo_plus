import { useState, useEffect } from 'react';
import { useAPI } from './use-api';

import { getUserInfo } from '../api';

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [, execute, isLoading, isError] = useAPI(getUserInfo);
  
  useEffect(() => {
    execute().then((response) => {
      if (response.code === 200) {
        setUserInfo(response.data);
      }
    });
  }, [execute]);

  return [userInfo, isLoading, isError];
}
