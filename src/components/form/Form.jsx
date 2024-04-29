import React from "react";
import PropTypes from "prop-types";
import Styles from "./Form.module.css";

const Form = ({ title, children }) => {
  return (
    <form className={Styles.form}>
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
