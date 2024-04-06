import React from "react";
import BurgerContentStyle from "./BurgerContent.module.css";
import BurgerConstructor from "./burger-constructor/BurgerConstructor";
import BurgerIngredients from "./burger-ingredients/BurgerIngredients";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/types/types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const BurgerContent = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
      <div className={BurgerContentStyle.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </>
  );
};

BurgerContent.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
  title: PropTypes.string,
};
export default BurgerContent;
