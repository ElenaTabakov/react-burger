import React from "react";
import LayoutStyle from "./Layout.module.css";
import PropTypes from "prop-types";

const Layout = ({ children, className }) => {
  return (
    <div className={`${className} ${LayoutStyle.container}`}>{children}</div>
  );
};
Layout.protTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Layout;
