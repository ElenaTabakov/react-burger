import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientGroup from "./burger-ingredien-group/BurgerIngredientGroup";
import BurgerIngredientCard from "./burger-ingredient-card/BurgerIngredientCard";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/types/types";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("one");

  const buns = ingredients?.filter((item) => item.type === "bun");
  const main = ingredients?.filter((item) => item.type === "main");
  const sauce = ingredients?.filter((item) => item.type === "sauce");

  if (!ingredients.length) {
    return null;
  } else {
    return (
      <div>
        <div className ="d-flex">
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            <a className={BurgerIngredientsStyle.link} href="#bun">
              Булки
            </a>
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            <a className={BurgerIngredientsStyle.link} href="#sauce">
              Соусы
            </a>
          </Tab>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            <a className={BurgerIngredientsStyle.link} href="#main">
              Начинки
            </a>
          </Tab>
        </div>
        <div className={`my-custom-scroll ${BurgerIngredientsStyle.container}`}>
          <BurgerIngredientGroup title={"Булки"} groupId={"bun"}>
            {buns &&
              buns.map((item) => (
                <li key={item._id}>
                  <BurgerIngredientCard
                    ingredient={item}
                  />
                </li>
              ))}
          </BurgerIngredientGroup>
          <BurgerIngredientGroup title={"Соусы"} groupId={"sauce"}>
            {sauce &&
              sauce.map((item) => (
                <li key={item._id}>
                  {" "}
                  <BurgerIngredientCard
                    ingredient={item}
                  />
                </li>
              ))}
          </BurgerIngredientGroup>
          <BurgerIngredientGroup title={"Начинки"} groupId={"main"}>
            {main &&
              main.map((item) => (
                <li key={item._id}>
                  <BurgerIngredientCard
                    ingredient={item}
                  />
                </li>
              ))}
          </BurgerIngredientGroup>
        </div>
      </div>
    );
  }
};
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes),
};

export default BurgerIngredients;
