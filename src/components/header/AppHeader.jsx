import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import Nav from "./nav/Nav";
import AppHeaderStyles from "./AppHeader.module.css";
import Login from "./login/Login";
import Layout from "../layout/Layout";

const AppHeader = () => {
  return (
    <header className={AppHeaderStyles.header_wrapper}>
      <Layout>
        <div className={`${AppHeaderStyles.header} d-grid pt-4 pb-4`}>
          <Nav />
          <a href="/">
            <Logo />
          </a>
          <Login />
        </div>
      </Layout>
    </header>
  );
};

export default AppHeader;
