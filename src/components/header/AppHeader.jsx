import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Nav from "./nav/Nav";
import AppHeaderStyles from "./AppHeader.module.css";
import LoginLink from "./login-link/LoginLink";
import Layout from "../layout/Layout";

const AppHeader = () => {
  return (
    <header className={AppHeaderStyles.header_wrapper}>
        <div className={`${AppHeaderStyles.header} d-grid pt-4 pb-4`}>
          <Nav />
          <a href="/">
            <Logo />
          </a>
          <LoginLink />
        </div>
    </header>
  );
};

export default AppHeader;
