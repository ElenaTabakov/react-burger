import React, { createContext, useEffect, useState } from "react";
import AppStyle from "./App.module.css";
import AppHeader from "../header/AppHeader";
import "../../global/global.css";
import Layout from "../layout/Layout";
import BurgerContent from "../burger-content/BurgerContent";

function App() {

  return (
    <>
      <AppHeader />
      <main>
        <Layout className={AppStyle.container}>
          <BurgerContent
            title={"Соберите бургер"}
          />
        </Layout>
      </main>
    </>
  );
}

export default App;
