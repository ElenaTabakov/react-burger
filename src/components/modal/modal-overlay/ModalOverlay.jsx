import React from "react";
import ModalOverlayStyles from "./ModalOverlay.module.css";


const ModalOverlay = ({ onClose }) => {
  return <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
