import React from "react";
import BurgerIngredientGroupStyle from "./BurgerIngredientGroup.module.css";

interface IBurgerIngredientGroupProps extends React.HTMLAttributes<HTMLDivElement>{
  title: string;
  groupId: string;
}
const BurgerIngredientGroup = ({ title, groupId, children } : IBurgerIngredientGroupProps) => {
  return (
    <div id={groupId}>
      <h2>{title}</h2>
      <ul className={BurgerIngredientGroupStyle.lists}>{children}</ul>
    </div>
  );
};

export default BurgerIngredientGroup;
