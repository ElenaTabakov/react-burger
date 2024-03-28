import React, { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCardStyle from "./BurgerIngredientCard.module.css";
import Modal from "../../../modal/Modal";
import IngredeientDetails from "../ingredeient-details/IngredeientDetails";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../../../utils/types/types";
import { useModal } from "../../../../utils/hooks/useModal";

const BurgerIngredientCard = ({ ingredient }) => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { name, image, price, _id, __v } = ingredient;

  return (
    <div id={_id}>
      <div className={BurgerIngredientCardStyle.item} onClick={openModal}>
        {__v > 0 && <Counter count={__v} size="small" />}
        <div>
          <img src={image} alt={name} />
        </div>
        <span className={BurgerIngredientCardStyle.price}>
          {price} <CurrencyIcon />{" "}
        </span>
        <h3 className={BurgerIngredientCardStyle.title}>{name}</h3>
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal} header={"Детали ингредиента"}>
          <IngredeientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  );
};
BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropTypes,
};
export default BurgerIngredientCard;
