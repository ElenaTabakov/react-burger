import React, { useEffect, useMemo, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";

const BurgerConstructor = ({ ingredients }) => {
  const CurrentBurger = useMemo(
    () =>
      ingredients
        ?.filter((item) => item.fat < 25 || item.calories < 300)
        .reduce((acc, item) => {
          item.type === "bun" ? acc.unshift(item) : acc.push(item);
          return acc;
        }, []),
    [ingredients]
  );

  const CurrentBurgerConstructor = CurrentBurger
    ? [...CurrentBurger, { ...CurrentBurger[0] }]
    : [];

  return (
    <div>
      <ul className="pb-4">
        {CurrentBurgerConstructor.slice(0, 1).map((item) => (
          <li key={item._id}>
            <ConstructorElement
              type="top"
              key={item._id}
              isLocked={true}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      <div>
        <ul className={`${BurgerConstructorStyle.container} my-custom-scroll`}>
          {CurrentBurgerConstructor.slice(1, -1).map((item) => (
            <li key={item._id}>
              <ConstructorElement
                key={item._id}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
      <ul className="pt-4">
        {CurrentBurgerConstructor.slice(-1).map((item) => (
          <li key={item._id}>
            <ConstructorElement
              key={item._id}
              isLocked={true}
              type="bottom"
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurgerConstructor;
