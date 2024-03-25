import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientGroup from "./burger-ingredien-group/BurgerIngredientGroup";
import BurgerIngredientCard from "./burger-ingredient-card/BurgerIngredientCard";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";
import Modal from "../../modal/Modal";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("one");
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const buns = ingredients?.filter((item) => item.type === "bun");
  const main = ingredients?.filter((item) => item.type === "main");
  const sauce = ingredients?.filter((item) => item.type === "sauce");

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };
  const handleOpenModal = () => {
    setModalIsVisible(true);
    console.log('click')
  };

  if (!ingredients.length) {
    return null;
  } else {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <Tab value="bun" active={current === "bun"}  onClick={setCurrent}>
            <a className={BurgerIngredientsStyle.link} href="#bun">
              Булки
            </a>
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            <a className={BurgerIngredientsStyle.link} href="#sauce">
              Соусы
            </a>
          </Tab>
          <Tab value="main" active={current === "main"}   onClick={setCurrent}>
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
                    onCLick={handleOpenModal}
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
                    onClick={handleOpenModal}
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
                    onClick={handleOpenModal}
                  />
                </li>
              ))}
          </BurgerIngredientGroup>
        </div>
        {modalIsVisible && (
          <Modal header={"test"} onClose={handleCloseModal}>
            ggg
          </Modal>
        )}
      </div>
    );
  }
};

export default BurgerIngredients;
