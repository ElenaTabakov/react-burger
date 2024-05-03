import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Nav from "./nav/Nav";
import AppHeaderStyles from "./AppHeader.module.css";
import LoginLink from "./login-link/LoginLink";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={AppHeaderStyles.header_wrapper}>
        <div className={`${AppHeaderStyles.header} d-grid pt-4 pb-4`}>
          <Nav />
            <Link to='/'><Logo /></Link>
          <LoginLink />
        </div>
    </header>
  );
};

export default AppHeader;
