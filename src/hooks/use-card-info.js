import { useState, useEffect } from 'react';
import { useAPI } from './use-api';

import { getCard } from '../api';

export function useCardInfo() {
  const [cardInfo, setCardInfo] = useState(null);
  const [, execute, isLoading, isError] = useAPI(getCard);
  
  useEffect(() => {
    const id = new URL(document.location).searchParams.get('id');

    if (!id) { return; }

    execute(id).then(response => {
      if (response.code === 200 && response.data !== null) {
        setCardInfo(response.data);
      }
    });
  }, [execute]);

  return [cardInfo, isLoading, isError];
}
