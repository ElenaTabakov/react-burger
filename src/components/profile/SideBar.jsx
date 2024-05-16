import React from "react";
import { NavLink } from "react-router-dom";
import SidebarStyles from "./Sidebar.module.css";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../services/slices/userSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(LogOutUser());
  };
  return (
    <div className={SidebarStyles.sideBar}>
      <NavLink
        to="/profile"
        className={({isActive}) =>
          `${isActive ? SidebarStyles.active : SidebarStyles.link} pt-2 pb-2`
        }
        end 
      >
        Профиль
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({isActive}) =>
          `${isActive ? SidebarStyles.active : SidebarStyles.link} pt-2 pb-2`
        }
        end 
      >
        История заказов
      </NavLink>
      <div onClick={handleLogOut} className={`${SidebarStyles.link} pt-2 pb-2`}>
        Выход
      </div>
    </div>
  );
};

export default SideBar;
