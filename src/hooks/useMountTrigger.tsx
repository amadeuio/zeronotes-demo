import { useEffect, useState } from 'react';

export const useMountTrigger = (delay = 0) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isMounted;
};
