import React, { useMemo, useEffect } from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";
import OrderTotal from "./order-total/OrderTotal";
import {RootState , useDispatch, useSelector } from "../../../services/store"
import BurgerList from "./BurgerList";
import { deleteIngredient } from "../../../services/slices/constructorSlice";
import BurgerConstructorCard from "./BurgerConstructorCard";
import useCardMove from "../../../utils/hooks/useCardMove";
import { setInredients } from "../../../services/slices/orderSlice";
import { IIngredientItemWithId} from "../../../utils/types/types";



const BurgerConstructor = ({className, children} : {className?: string, children?: React.ReactNode}) => {
  const bun = useSelector((state: RootState) => state.constructorBurger.bun) || [];
  const memoizedBun = useMemo(() => bun, [bun]);
  const { sortableIngredients, moveCard } = useCardMove();
  const dispatch = useDispatch();

  const currentBurger = useMemo(
    () =>
      sortableIngredients
        ?.concat(memoizedBun)
        .reduce((acc : IIngredientItemWithId[], item:IIngredientItemWithId) => {
          item.type === "bun" ? acc.unshift(item) : acc.push(item);
          return acc;
        }, [])
        .concat(memoizedBun),
    [sortableIngredients, memoizedBun]
  );

  useEffect(() => {
    const ingredientsId = currentBurger.map((item: IIngredientItemWithId) => item._id)
    dispatch(setInredients({ingredientsId}))
  },[currentBurger,dispatch])

  const total = currentBurger?.reduce((acc : number, item : IIngredientItemWithId) => {
    return acc + item.price;
  }, 0);

  const handleDelete = (uniqueId : string) => {
    dispatch(deleteIngredient( uniqueId ));
  };

  return (
    <div className={BurgerConstructorStyle.leftSide}>
      <div className={BurgerConstructorStyle.inner}>
        <BurgerList className="pb-4" isBun={true}>
          {bun.length ? (
            bun.map((item:IIngredientItemWithId) => (
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
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    handleClose={ () => item.uniqueId && handleDelete(item.uniqueId) }
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
            bun.map((item:IIngredientItemWithId) => (
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
