import React from "react";
import BurgerIngredientGroupStyle from "./BurgerIngredientGroup.module.css";
import PropTypes from "prop-types";

const BurgerIngredientGroup = ({ title, groupId, children }) => {
  BurgerIngredientGroup.propTypes = {
    title: PropTypes.string,
    groupId: PropTypes.string,
    children: PropTypes.any,
  };

  return (
    <div id={groupId}>
      <h2>{title}</h2>
      <ul className={BurgerIngredientGroupStyle.lists}>{children}</ul>
    </div>
  );
};

export default BurgerIngredientGroup;
