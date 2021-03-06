import { useState, useEffect } from 'react';
import { useAPI } from './use-api';

import { getTodo } from '../api';

export function useTodoInfo() {
  const [todoInfo, setTodoInfo] = useState({
    createdAt: null,
    list: null,
    image: {
      file: null,
      url: require('../asset/images/bitmap.png'),
    },
    visitCount: 0,
  });
  const [, execute, isLoading, isError] = useAPI(getTodo);
  
  useEffect(() => {
    execute().then(response => {
      if (response.code === 200 && response.data !== null) {
        setTodoInfo(response.data);
      }
    });
  }, [execute]);

  return [todoInfo, setTodoInfo, isLoading, isError];
}
