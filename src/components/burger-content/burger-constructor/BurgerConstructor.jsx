import React, { useEffect, useMemo, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ingredients}) => {


  const CurrentBurger = useMemo(() => 
     ingredients
      ?.filter((item) => item.fat < 25 || item.calories < 300)
      .reduce((acc, item) => {
        item.type === "bun" ? acc.unshift(item) : acc.push(item);
        return acc;
      }, [])
    ,[ingredients])

  const CurrentBurgerConstructor = CurrentBurger
    ? [...CurrentBurger, { ...CurrentBurger[0] }]
    : [];

  return (
    <div
      className={BurgerConstructorStyle.container_main}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {CurrentBurgerConstructor.slice(0, 1).map((item) => (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      ))}

      <div
        className={`${BurgerConstructorStyle.container_main} my-custom-scroll`}
      >
        {CurrentBurgerConstructor.slice(1, -1).map((item) => (
          <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        ))}
      </div>

      {CurrentBurgerConstructor.slice(-1).map((item) => (
        <ConstructorElement
          isLocked={true}
          type="bottom"
          text={item.name}
          price={item.price}
          thumbnail={item.image}
        />
      ))}
    </div>
  );
};

export default BurgerConstructor;
