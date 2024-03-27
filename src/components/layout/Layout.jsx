import React from "react";
import LayoutStyle from "./Layout.module.css";
import PropTypes from "prop-types";

const Layout = ({ children, className }) => {
  Layout.prototype = {
    children: PropTypes.any,
    className: PropTypes.string,
  };
  return (
    <div className={`${className} ${LayoutStyle.container}`}>{children}</div>
  );
};

export default Layout;
