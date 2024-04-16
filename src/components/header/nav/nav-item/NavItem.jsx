import NavItemStyles from "./NavItem.module.css";
import PropTypes from "prop-types";

const NavItem = ({ text, icon}) => {
  return (
    <span  className={`${NavItemStyles.link}   d-flex`}>
      {icon}
      {text}
    </span>
  );
};
NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
};
export default NavItem;
