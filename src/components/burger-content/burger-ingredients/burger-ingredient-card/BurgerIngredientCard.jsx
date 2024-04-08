import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCardStyle from "./BurgerIngredientCard.module.css";
import Modal from "../../../modal/Modal";
import IngredeientDetails from "../ingredeient-details/IngredeientDetails";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropTypes } from "../../../../utils/types/types";
import { useModal } from "../../../../utils/hooks/useModal";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "../../../../services/slices/currentIngredientSlice";
import PropTypes from "prop-types";

const BurgerIngredientCard = ({ ingredient, counter }) => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { name, image, price, _id, __v, type } = ingredient;
  const { currentIngredient } = useSelector((state) => state.currentIngredient);
  const dispatch = useDispatch();

  const [{ opacity }, ref] = useDrag({
    type: type === "bun" ? "bun" : "other",
    item: ingredient ,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleOpenModal = (ingredient) => {
    openModal();
    dispatch(setCurrentIngredient(ingredient));
  };

  const handleCloseModal = () => {
    closeModal();
    dispatch(clearCurrentIngredient());
  };

  return (
    <div id={_id} ref={ref} draggablestyle={{ opacity }}>
      <div
        className={BurgerIngredientCardStyle.item}
        onClick={() => handleOpenModal(ingredient)}
      >
        {counter > 0 && <Counter count={counter} size="small" />}
        <div>
          <img src={image} alt={name} />
        </div>
        <span className={BurgerIngredientCardStyle.price}>
          {price} <CurrencyIcon />
        </span>
        <h3 className={BurgerIngredientCardStyle.title}>{name}</h3>
      </div>
      {isOpenModal && (
        <Modal onClose={handleCloseModal} header={"Детали ингредиента"}>
          <IngredeientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </div>
  );
};
BurgerIngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  counter: PropTypes.number,
};
export default BurgerIngredientCard;
