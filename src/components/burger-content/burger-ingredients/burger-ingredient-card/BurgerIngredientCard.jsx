import React, { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCardStyle from "./BurgerIngredientCard.module.css";
import Modal from "../../../modal/Modal";
import BurgerDescriptionCard from "../burger-description-card/BurgerDescriptionCard";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../../util/types/types";

const BurgerIngredientCard = ({ ingredient }) => {
  const [showModal, setShowModal] = useState(false);
  const { name, image, price, _id, __v } = ingredient;

  return (
    <div id={_id}>
      <div
        className={BurgerIngredientCardStyle.item}
        onClick={() => setShowModal(true)}
      >
        {__v > 0 && <Counter count={__v} size="small" />}
        <div>
          <img src={image} alt={name} />
        </div>
        <span className={BurgerIngredientCardStyle.price}>
          {price} <CurrencyIcon />{" "}
        </span>
        <h3 className={BurgerIngredientCardStyle.title}>{name}</h3>
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          header={"Детали ингредиента"}
        >
          <BurgerDescriptionCard ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
};
BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropTypes,
};
export default BurgerIngredientCard;
