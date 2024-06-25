import React from "react";
import ModalOverlayStyles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose } : { onClose : () => void}) => {
  return <div className={ModalOverlayStyles.overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
