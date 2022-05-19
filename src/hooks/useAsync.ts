import { useEffect } from 'react';
import { useIsMounted } from './useIsMounted';

export const useAsync = <T>(asyncFn: () => Promise<T>, onSuccess: (data: T) => void) => {
  const isMounted = useIsMounted();

  useEffect(() => {
    void asyncFn().then((data) => {
      if (isMounted()) {
        onSuccess(data);
      }
    });
  }, []);
};
