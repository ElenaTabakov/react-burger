import NavItemStyles from "./NavItem.module.css";

const NavItem = ({ text, icon} : {text?: string | null, icon: JSX.Element}) => {
  return (
    <span  className={`${NavItemStyles.link}   d-flex`}>
      {icon}
      {text}
    </span>
  );
};

export default NavItem;
