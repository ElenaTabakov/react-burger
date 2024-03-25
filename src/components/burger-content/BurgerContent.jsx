import React from "react";
import BurgerContentStyle from "./BurgerContent.module.css";
import BurgerConstructor from "./burger-constructor/BurgerConstructor";
import BurgerIngredients from "./burger-ingredients/BurgerIngredients";

const BurgerContent = ({ title ,ingredients }) => {

  return (
    <>
      <h1>{title}</h1>
      <div className={BurgerContentStyle.container}>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor ingredients={ingredients}/>
      </div>
    </>
  );
};

export default BurgerContent;
