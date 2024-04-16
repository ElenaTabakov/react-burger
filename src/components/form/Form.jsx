import React from "react";
import PropTypes from "prop-types";

const Form = ({ title, children }) => {
  return (
    <form>
      <h2>{title}</h2>
      {children}
    </form>
  );
};
Form.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default Form;
