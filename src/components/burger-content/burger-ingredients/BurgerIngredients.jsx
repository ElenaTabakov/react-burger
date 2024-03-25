import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientGroup from "./burger-ingredien-group/BurgerIngredientGroup";
import BurgerIngredientCard from "./burger-ingredient-card/BurgerIngredientCard";
import BurgerIngredientsStyle from './BurgerIngredients.module.css'

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("one");

  
  const buns = ingredients?.filter((item) => item.type === "bun");
  const main = ingredients?.filter((item) => item.type === "main");
  const sauce = ingredients?.filter((item) => item.type === "sauce");
  

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          <a href="#bun">Булки</a>
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          <a href="#sauce">Соусы</a>
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          <a href="#main">Начинки</a>
        </Tab>
      </div>
      <div className={`my-custom-scroll ${BurgerIngredientsStyle.container}`}>
        <BurgerIngredientGroup title={"Булки"} groupId={"bun"}>
             {buns && buns.map((item) => <li  key={item._id}><BurgerIngredientCard ingredient={item}/></li> )}    
        </BurgerIngredientGroup>
        <BurgerIngredientGroup title={"Соусы"} groupId={"sauce"}>
          {sauce && sauce.map((item) => <li key={item._id}> <BurgerIngredientCard ingredient={item}/></li>)}
        </BurgerIngredientGroup>
        <BurgerIngredientGroup title={"Начинки"} groupId={"main"}>
          {main && main.map((item) => <li key={item._id}><BurgerIngredientCard ingredient={item}/></li>)}
        </BurgerIngredientGroup>
      </div>
    </div>
  );
};

export default BurgerIngredients;
