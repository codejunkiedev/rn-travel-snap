import { useCallback, useState } from 'react';

// This hook is used to show loading indicator/spinner
// It returns an array of 4 elements:
// 1. loading: boolean
// 2. updateLoading: function to update loading
// 3. message: string
// 4. updateMessage: function to update message

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
