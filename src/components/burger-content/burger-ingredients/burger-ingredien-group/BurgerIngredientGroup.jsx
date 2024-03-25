import React from "react";

const BurgerIngredientGroup = ({ title, groupId, children }) => {
  return (
    <div id={groupId}>
      <h2>{title}</h2>
       {children}
    </div>
  );
};

export default BurgerIngredientGroup;
