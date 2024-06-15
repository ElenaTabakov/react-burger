import React, {  useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientGroup from "./burger-ingredien-group/BurgerIngredientGroup.tsx";
import BurgerIngredientCard from "./burger-ingredient-card/BurgerIngredientCard";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredientsAsync } from "../../../services/slices/ingredientsSlice";
import { useInView, InView } from "react-intersection-observer";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();
  const orderIngredients = useSelector((state) => state.order.ingredients);
  const [counter, setCounter] = useState({});

  const buns = ingredients?.filter((item) => item.type === "bun");
  const main = ingredients?.filter((item) => item.type === "main");
  const sauce = ingredients?.filter((item) => item.type === "sauce");

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAsync());
    }
    return;
  }, [ingredients, dispatch]);

  useEffect(() => {
    const countId = orderIngredients.reduce((acc, item) => {
      !acc[item] ? (acc[item] = 1) : (acc[item] += 1);
      return acc;
    }, {});
    setCounter(countId);
  }, [orderIngredients]);


  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  if (!ingredients.length) {
    return <p>Not items found</p>;
  } else {
    return (
      <div>
        <div className="d-flex">
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
                <InView
                  key={item._id}
                  onChange={(inView) => inView && setCurrent("bun")}
                >
                  <div ref={ref}>
                    <li key={item._id}>
                      <BurgerIngredientCard
                        ingredient={item}
                        counter={counter[item._id]}
                      />
                    </li>
                  </div>
                </InView>
              ))}
          </BurgerIngredientGroup>

          <BurgerIngredientGroup title={"Соусы"} groupId={"sauce"}>
            {sauce &&
              sauce.map((item) => (
                <InView
                  key={item._id}
                  onChange={(inView) => inView && setCurrent("sauce")}
                >
                  <div ref={ref}>
                    <li key={item._id}>
                      <BurgerIngredientCard
                        ingredient={item}
                        counter={counter[item._id]}
                      />
                    </li>
                  </div>
                </InView>
              ))}
          </BurgerIngredientGroup>

          <BurgerIngredientGroup title={"Начинки"} groupId={"main"}>
            {main &&
              main.map((item) => (
                <InView
                  key={item._id}
                  onChange={(inView) => inView && setCurrent("main")}
                >
                  <div ref={ref}>
                    <li key={item._id}>
                      <BurgerIngredientCard
                        ingredient={item}
                        counter={counter[item._id]}
                      />
                    </li>
                  </div>
                </InView>
              ))}
          </BurgerIngredientGroup>
        </div>
      </div>
    );
  }
};

export default BurgerIngredients;
