import { createPortal } from "react-dom";
import ModalStyles from "./Modal.module.css";
import ModalHeader from "./modal-header/ModalHeader";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ onClose, header, children }) => {
  return createPortal(
    <div className={ModalStyles.modal}>
      <div className={ModalStyles.content}>
        <ModalHeader onClose={onClose} onClick={() => console.log("onclose")}>
          {header}
        </ModalHeader>
        {children}
      </div>
      <div className={ModalStyles.overlay} onClick={onClose} />
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  onClose: PropTypes.func,
  header: PropTypes.string,
  children: PropTypes.node,
};
export default Modal;
