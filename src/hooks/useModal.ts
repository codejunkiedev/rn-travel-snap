import { useCallback, useState } from 'react';

// This hook is used to handle modal state
// It returns an array of 3 elements:
// 1. showModal: boolean
// 2. openModal: function to open modal
// 3. closeModal: function to close modal

export const useModal = (initState: boolean = false) => {
  const [showModal, setShowModal] = useState<boolean>(initState);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return [showModal, openModal, closeModal] as const;
};
