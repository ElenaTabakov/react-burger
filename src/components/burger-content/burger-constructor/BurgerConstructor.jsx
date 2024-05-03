import React, { useMemo, useEffect } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";
import OrderTotal from "./order-total/OrderTotal";
import { useSelector, useDispatch } from "react-redux";
import BurgerList from "./BurgerList";
import { deleteIngredient } from "../../../services/slices/constructorSlice";
import BurgerConstructorCard from "./BurgerConstructorCard";
import useCardMove from "../../../utils/hooks/useCardMove";
import { setInredients } from "../../../services/slices/orderSlice";

const BurgerConstructor = () => {
  const { bun } = useSelector((state) => state.constructorBurger);
  const { sortableIngredients, moveCard } = useCardMove();
  const dispatch = useDispatch();

  const currentBurger = useMemo(
    () =>
      sortableIngredients
        ?.concat(bun)
        .reduce((acc, item) => {
          item.type === "bun" ? acc.unshift(item) : acc.push(item);
          return acc;
        }, [])
        .concat(bun),
    [sortableIngredients, bun]
  );

  useEffect(() => {
    const ingredientsId = currentBurger.map(item => item._id)
    dispatch(setInredients({ingredientsId}))
  },[currentBurger,dispatch])

  const total = currentBurger?.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  const handleDelete = (uniqueId, originalId) => {
    dispatch(deleteIngredient({ uniqueId }));
  };

  return (
    <div className={BurgerConstructorStyle.leftSide}>
      <div className={BurgerConstructorStyle.inner}>
        <BurgerList className="pb-4" isBun={true}>
          {bun.length ? (
            bun.map((item) => (
              <li key={`${item._id}-top`}>
                <ConstructorElement
                  type="top"
                  key={item._id}
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))
          ) : (
            <p className={BurgerConstructorStyle.emptyBunTop}>
              Place your bun here
            </p>
          )}
        </BurgerList>
        <div className={BurgerConstructorStyle.fullWidth}>
          <BurgerList
            className={`${BurgerConstructorStyle.container} my-custom-scroll other`}
          >
            {sortableIngredients.length ? (
              sortableIngredients.map((item, index) => (
                <BurgerConstructorCard
                  index={index}
                  key={item.uniqueId}
                  moveCard={moveCard}
                >
                  <div className={BurgerConstructorStyle.dragIcon}><DragIcon type="primary" /></div>
                  <ConstructorElement
                    uniqueId={item.uniqueId}
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={() => handleDelete(item.uniqueId, item._id)}
                  />
                </BurgerConstructorCard>
              ))
            ) : (
              <p
                className={`${BurgerConstructorStyle.emptyBunTop} ${BurgerConstructorStyle.other}`}
              >
                Place your ingredients here
              </p>
            )}
          </BurgerList>
        </div>
        <BurgerList className="pt-4 bun" isBun={true}>
          {bun.length ? (
            bun.map((item) => (
              <li key={`${item._id}-bottom`}>
                <ConstructorElement
                  type="bottom"
                  key={item._id}
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))
          ) : (
            <p
              className={`${BurgerConstructorStyle.emptyBunTop} ${BurgerConstructorStyle.bottomBun}`}
            >
              Place your bun here
            </p>
          )}
        </BurgerList>
      </div>
      <OrderTotal total={total} />
    </div>
  );
};
export default BurgerConstructor;
