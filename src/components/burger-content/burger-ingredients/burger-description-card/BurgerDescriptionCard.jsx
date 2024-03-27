import React, { useEffect } from "react";
import BurgerDescriptionCardStyles from "./BurgerDescriptionCard.module.css";
import PropTypes, { objectOf } from "prop-types";
import { ingredientPropTypes } from "../../../../util/types/types";

const BurgerDescriptionCard = ({ ingredient }) => {
  const { name, image_large, proteins, fat, carbohydrates, calories } =
    ingredient;
   
  return (
    <div className={BurgerDescriptionCardStyles.container}>
      <div>
        <img src={image_large} alt={name} />
      </div>
      <h3>{name}</h3>
      <div className={BurgerDescriptionCardStyles.details}>
        <span className={BurgerDescriptionCardStyles.pfc}>
          <span>{"Калории,ккал"}</span>
          {calories}
        </span>
        <span className={BurgerDescriptionCardStyles.pfc}>
          <span>{"Белки, г"}</span>
          {proteins}
        </span>
        <span className={BurgerDescriptionCardStyles.pfc}>
          <span>{"Жиры, г"}</span>
          {fat}
        </span>
        <span className={BurgerDescriptionCardStyles.pfc}>
          <span>{"Углеводы, г"}</span>
          {carbohydrates}
        </span>
      </div>
    </div>
  );
};
BurgerDescriptionCard.propTypes = {
  ingredient: ingredientPropTypes,
};
export default BurgerDescriptionCard;
