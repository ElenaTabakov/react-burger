import React from "react";
import PropTypes from "prop-types";
import Styles from "./Form.module.css";

const Form = ({ title, children, onSubmit }) => {
  return (
    <form className={Styles.form} onSubmit={onSubmit}>
      {title && <h2>{title}</h2>}
      {children}
    </form>
  );
};
Form.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Form;
