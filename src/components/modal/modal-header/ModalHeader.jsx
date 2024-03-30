import React from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalHeaderStyles from "./ModalHeader.module.css";
import PropTypes from "prop-types";

const ModalHeader = ({ children, onClose }) => {
  return (
    <div className={ModalHeaderStyles.header}>
      <button className={ModalHeaderStyles.button} onClick={onClose}>
        <CloseIcon />
      </button>
      {children && <h2 className={ModalHeaderStyles.title}>{children}</h2>}
    </div>
  );
};
ModalHeader.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
export default ModalHeader;
