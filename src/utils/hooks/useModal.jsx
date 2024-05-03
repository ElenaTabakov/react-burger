import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate()

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const closeModalRoute = useCallback(() => {
    navigate(-1);
  },[navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModalRoute()
      }
    };
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  },[closeModalRoute]);


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
    closeModalRoute
  };
};
