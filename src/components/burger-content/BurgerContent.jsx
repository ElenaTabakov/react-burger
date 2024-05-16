import React from "react";
import BurgerContentStyle from "./BurgerContent.module.css";
import BurgerConstructor from "./burger-constructor/BurgerConstructor";
import BurgerIngredients from "./burger-ingredients/BurgerIngredients";
import PropTypes from "prop-types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const BurgerContent = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
      <div className={BurgerContentStyle.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor  className={BurgerContentStyle.leftSide}/>
        </DndProvider>
      </div>
    </>
  );
};

BurgerContent.propTypes = {
  title: PropTypes.string.isRequired,
};
export default BurgerContent;
