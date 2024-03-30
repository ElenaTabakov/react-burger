import React from "react";
import NavItemStyles from "./NavItem.module.css";
import PropTypes from "prop-types";

const NavItem = ({ link, text, icon, id, onClick, activeLink }) => {
  return (
    <a
      href={link}
      className={`${NavItemStyles.link} ${
        activeLink === id && NavItemStyles.active_link
      }  d-flex`}
      id={id}
      onClick={onClick}
    >
      {icon}
      {text}
    </a>
  );
};
NavItem.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.node,
  id: PropTypes.string,
  onClick: PropTypes.func,
  activeLink: PropTypes.string,
};
export default NavItem;
