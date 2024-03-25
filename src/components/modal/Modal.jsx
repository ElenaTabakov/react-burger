import React from "react";
import { ReactDOM } from "react";
import ModalHeader from "./modal-header/ModalHeader"; 
import ModalStyles from "./Modal.module.css"

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header,onClose }) => {
  
  return ReactDOM.createPortal(
    <>
      <div className="Modal">
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
      <div className={ModalStyles.overlay} onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal
