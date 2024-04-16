import NavStyle from "./Nav.module.css";
import NavItem from "./nav-item/NavItem";
import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className={NavStyle.nav}>
      <ul className={`${NavStyle.nav_list} d-flex`}>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? NavStyle.active : NavStyle.link
            }
          >
            <NavItem icon={<BurgerIcon />} text={"Конструктор"} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/list"}
            className={({ isActive }) =>
              isActive ? NavStyle.active : NavStyle.link
            }
          >
            <NavItem icon={<ListIcon />} text={"Лента заказов"} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
