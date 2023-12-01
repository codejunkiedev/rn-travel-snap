import { useCallback, useState } from 'react';

export const useModal = (initState: boolean = false) => {
  const [showModal, setShowModal] = useState<boolean>(initState);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return [showModal, openModal, closeModal] as const;
};
