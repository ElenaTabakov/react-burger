import React from "react";
import BurgerContentStyle from "./BurgerContent.module.css";
import BurgerConstructor from "./burger-constructor/BurgerConstructor";
import BurgerIngredients from "./burger-ingredients/BurgerIngredients";
import PropTypes from "prop-types";

export const ingredientPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

const BurgerContent = ({ title, ingredients }) => {
  BurgerContent.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.ingredientPropTypes).isRequired,
    title: PropTypes.string,
  };

  return (
    <>
      <h1>{title}</h1>
      <div className={BurgerContentStyle.container}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </div>
    </>
  );
};

export default BurgerContent;
