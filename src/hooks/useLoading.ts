import { useCallback, useState } from 'react';

export const useLoading = (initLoading: boolean = false, initMessage: string = 'Loading...') => {
  const [loading, setLoading] = useState<boolean>(initLoading);
  const [message, setMessage] = useState<string>(initMessage);

  const updateLoading = useCallback((newLoading: boolean) => {
    setLoading(newLoading);
  }, []);

  const updateMessage = useCallback((newMessage: string) => {
    setMessage(newMessage);
  }, []);

  return [loading, updateLoading, message, updateMessage] as const;
};
