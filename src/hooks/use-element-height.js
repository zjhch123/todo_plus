import { useState, useRef, useEffect } from 'react';

export function useElementHeight() {
  const ref = useRef(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  return [ref, height, () => ref.current.offsetHeight];
}
