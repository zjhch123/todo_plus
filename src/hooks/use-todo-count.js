import { useState, useEffect } from 'react';
import { useAPI } from './use-api';

import { getTodoCount } from '../api';

export function useTodoCount() {
  const [todoCount, setTodoCount] = useState(0);
  const [, execute] = useAPI(getTodoCount);
  
  useEffect(() => {
    execute().then(response => {
      if (response.code === 200) {
        setTodoCount(response.data);
      }
    });
  }, [execute]);

  return [todoCount];
}
