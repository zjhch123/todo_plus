import { useEffect, useState } from 'react';

export function useCountDown(startTimestamp, interval = 1000) {
  const [countDown, setCountDown] = useState(Date.now() - startTimestamp);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCountDown(Date.now() - startTimestamp);
    }, interval);

    return () => clearTimeout(timeoutId);
  }, [countDown, interval, startTimestamp]);

  return countDown;
}
