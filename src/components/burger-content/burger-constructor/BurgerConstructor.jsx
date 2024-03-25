import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from './BurgerConstructor.module.css'

const BurgerConstructor = () => {
  return (
    <div className={BurgerConstructorStyle.container_main} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        // thumbnail={img}
      />
      <div className="bugrer_filling my-custom-scroll">
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          // thumbnail={img}
        />
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        // thumbnail={img}
      />
    </div>
  );
};

export default BurgerConstructor;
