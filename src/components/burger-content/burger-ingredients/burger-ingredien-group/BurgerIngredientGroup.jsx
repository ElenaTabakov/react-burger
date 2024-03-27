import React from "react";
import BurgerIngredientGroupStyle from "./BurgerIngredientGroup.module.css";
import PropTypes from "prop-types";

const BurgerIngredientGroup = ({ title, groupId, children }) => {
  return (
    <div id={groupId}>
      <h2>{title}</h2>
      <ul className={BurgerIngredientGroupStyle.lists}>{children}</ul>
    </div>
  );
};
BurgerIngredientGroup.propTypes = {
  title: PropTypes.string,
  groupId: PropTypes.string,
  children: PropTypes.any,
};
export default BurgerIngredientGroup;
