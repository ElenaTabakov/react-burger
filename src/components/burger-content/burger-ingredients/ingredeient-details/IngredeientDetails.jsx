import React from "react";
import IngredeientDetailsStyles from "./IngredeientDetails.module.css";
import { ingredientPropTypes } from "../../../../utils/types/types";

const IngredeientDetails = ({ ingredient }) => {
  const { name, image_large, proteins, fat, carbohydrates, calories } =
    ingredient;

  return (
    <div className={IngredeientDetailsStyles.container}>
      <div>
        <img src={image_large} alt={name} />
      </div>
      <h3>{name}</h3>
      <div className={IngredeientDetailsStyles.details}>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Калории,ккал"}</span>
          {calories}
        </span>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Белки, г"}</span>
          {proteins}
        </span>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Жиры, г"}</span>
          {fat}
        </span>
        <span className={IngredeientDetailsStyles.pfc}>
          <span>{"Углеводы, г"}</span>
          {carbohydrates}
        </span>
      </div>
    </div>
  );
};
IngredeientDetails.propTypes = {
  ingredient: ingredientPropTypes,
};
export default IngredeientDetails;
