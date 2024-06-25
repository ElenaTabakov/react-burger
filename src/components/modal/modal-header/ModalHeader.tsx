import React, { HTMLAttributes } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalHeaderStyles from "./ModalHeader.module.css";

interface IModalHeader extends HTMLAttributes<HTMLDivElement>{
  onClose: () => void;
}

const ModalHeader = ({ children, onClose } : IModalHeader) => {
  return (
    <div className={ModalHeaderStyles.header}>
      <button className={ModalHeaderStyles.button} onClick={onClose}>
        <CloseIcon type='primary'/>
      </button>
      {children && <h2 className={ModalHeaderStyles.title}>{children}</h2>}
    </div>
  );
};

export default ModalHeader;
