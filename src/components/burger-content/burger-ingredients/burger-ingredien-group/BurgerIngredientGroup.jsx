import React from "react";
import BurgerIngredientGroupStyle from './BurgerIngredientGroup.module.css'

const BurgerIngredientGroup = ({ title, groupId, children }) => {
  return (
    <div id={groupId}>
      <h2>{title}</h2>
       <ul className={BurgerIngredientGroupStyle.lists}>
       {children}
       </ul>
    </div>
  );
};

export default BurgerIngredientGroup;
