import React from "react";
import NavItemStyles from "./NavItem.module.css";
import PropTypes from "prop-types";

const NavItem = ({ link, text, icon, id, onClick, activeLink }) => {
  NavItem.propTypes = {
    link: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.any,
    id: PropTypes.string,
    onClick: PropTypes.func,
    activeLink: PropTypes.string,
  };
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

export default NavItem;
