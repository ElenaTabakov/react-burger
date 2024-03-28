import { useState, useCallback, useEffect } from "react";

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  useEffect(() => {
    if (!isOpenModal) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenModal, closeModal]);

  return {
    isOpenModal,
    openModal,
    closeModal,
  };
};
