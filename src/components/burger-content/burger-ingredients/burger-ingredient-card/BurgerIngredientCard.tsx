import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientCardStyle from "./BurgerIngredientCard.module.css";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientItem } from "../../../../utils/types/types";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

interface IBurgerIngredientCard {
  ingredient: IIngredientItem;
  counter: number;
}

const BurgerIngredientCard = ({ ingredient, counter} : IBurgerIngredientCard) => {
  const location = useLocation();
  const { name, image, price, _id, type } = ingredient;
  const ingredientId = ingredient["_id"];

  const [{ opacity }, ref] = useDrag({
    type: type === "bun" ? "bun" : "other",
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Link
      to={`/ingredients/${ingredientId}`}
      key={ingredientId}
      state={{ background: location}}
      className={BurgerIngredientCardStyle.link}
    >
      <div id={_id} ref={ref} style={{opacity}}>
        <div className={BurgerIngredientCardStyle.item}>
          {counter > 0 && <Counter count={counter} size="small" />}
          <div>
            <img src={image} alt={name} />
          </div>
          <span className={BurgerIngredientCardStyle.price}>
            {price} <CurrencyIcon type={'primary'}/>
          </span>
          <h3 className={BurgerIngredientCardStyle.title}>{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default BurgerIngredientCard;
