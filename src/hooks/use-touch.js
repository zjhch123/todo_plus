import { useState, useEffect } from 'react';
import _ from 'underscore';

export function useTouch(ref) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    let retValue = _.noop;
    if (!ref.current) { return retValue; }

    const onTouchStart = () => setIsTouch(true);
    const onTouchEnd = () => setIsTouch(false);

    const { current } = ref;

    current.addEventListener('touchstart', onTouchStart);
    current.addEventListener('touchend', onTouchEnd);
    current.addEventListener('touchcancel', onTouchEnd);

    current.addEventListener('mousedown', onTouchStart);
    current.addEventListener('mouseup', onTouchEnd);

    return () => {
      current.removeEventListener('touchstart', onTouchStart);
      current.removeEventListener('touchend', onTouchEnd);
      current.removeEventListener('touchcancel', onTouchEnd);

      current.removeEventListener('mousedown', onTouchStart);
      current.removeEventListener('mouseup', onTouchEnd);
    };
  }, [ref]);

  return isTouch;
}
