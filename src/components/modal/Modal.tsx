import { createPortal } from "react-dom";
import ModalStyles from "./Modal.module.css";
import ModalHeader from "./modal-header/ModalHeader";
import ModalOverlay from "./modal-overlay/ModalOverlay";
import { ReactNode } from "react";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

interface IModalProps {
  onClose: () => void;
  header?: string;
  children?: ReactNode;
}

const Modal = ({ onClose, header, children }: IModalProps) => {
  if (!modalRoot) return null;
  return createPortal(
    <div className={ModalStyles.modal}>
      <div className={ModalStyles.content}>
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    modalRoot
  );
};

export default Modal;
