import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";
import OrderTotal from "./order-total/OrderTotal";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/types/types";

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

  const total = CurrentBurgerConstructor.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return (
    <div>
      <div className={BurgerConstructorStyle.inner}>
        <ul className="pb-4">
          {CurrentBurgerConstructor.slice(0, 1).map((item) => (
            <li key={`${item._id}-top`}>
              <ConstructorElement
                type="top"
                key={item._id}
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
        <div>
          <ul
            className={`${BurgerConstructorStyle.container} my-custom-scroll`}
          >
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
            <li key={`${item._id}-bottom`}>
              <ConstructorElement
                key={item._id}
                isLocked={true}
                type="bottom"
                text={`${item.name} (низ)`}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </ul>
      </div>
      <OrderTotal total={total} />
    </div>
  );
};
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};
export default BurgerConstructor;
