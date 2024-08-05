import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/store";
import { IIngredientItem, IOrder } from "../../utils/types/types";
import IngredientImage from "./IngredientImage";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from "./OrderCard.module.css";
import { fetchIngredientsAsync } from "../../services/slices/ingredientsSlice";

const OrderDetailsPage = () => {
  const { number } = useParams<string>();
  const ordersUser = useSelector((state) => state.userOrders.userOrders.orders);
  const allOrders = useSelector((state) => state.feed.ordersData.orders);
  const ingredientsMap = useSelector((state) => state.ingredients.ingredientsMap);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const [currentIngredients, setCurrentIngredients] = useState<string[]>([]);
  const dispatch = useDispatch();

  const dateOrder = (): JSX.Element | null => {
    if (currentOrder) {
      const dateFromServer = currentOrder.createdAt;
      return <FormattedDate date={new Date(dateFromServer)} />;
    }
    return null; 
  };

  useEffect(() => {
    const currentNumber = number ? parseInt(number) : null;

    if (currentNumber !== null && currentOrder === null) {
      const userOrder = ordersUser.find((item) => item.number === currentNumber);
      if (userOrder) {
        setCurrentOrder(userOrder);
      } else {
        const allOrder = allOrders.find((item) => item.number === currentNumber);
        if (allOrder) {
          setCurrentOrder(allOrder);
        } else {
          fetch(`https://norma.nomoreparties.space/api/orders/${currentNumber}`)
            .then((response) => response.json())
            .then((data) => {
              if (data.orders && data.orders.length > 0) {
                setCurrentOrder(data.orders[0]);
              }
            })
            .catch((error) => {
              console.error("Error fetching order:", error);
            });
        }
      }
    }
  }, [number, ordersUser, allOrders, currentOrder]);

  useEffect(() => {
    if (!ingredientsMap || Object.keys(ingredientsMap).length === 0) {
      dispatch(fetchIngredientsAsync());
    }
    if (currentOrder) {
      setCurrentIngredients(currentOrder.ingredients);
    }
  }, [currentOrder, dispatch,ingredientsMap]);

  const ingredientsOrder = currentIngredients.reduce(
    (
      acc: { [key: string]: { item: IIngredientItem; quantity: number } },
      item: string
    ) => {
      if (ingredientsMap[item]) {
        if (acc[item]) {
          acc[item].quantity += 1;
        } else {
          acc[item] = {
            item: ingredientsMap[item],
            quantity: 1,
          };
        }
      }
      return acc;
    },
    {}
  );

  const uniqueIngredientsArray: Array<{
    item: IIngredientItem;
    quantity: number;
  }> = ingredientsOrder ? Object.values(ingredientsOrder) : [];

  const total = uniqueIngredientsArray.reduce((acc, item) => {
    return acc + item.item.price * item.quantity;
  }, 0);

  return (
    <div className={Style.modalWrapper}>
      <h2 className="text_type_digits-default t-center">#{number}</h2>
      <h3 className="text_type_main-medium">{currentOrder?.name}</h3>
      <span className={Style.status}>{currentOrder?.status}</span>
      <div className={Style.bottomWrapper}>
        <h3 className="text_type_main-medium">Состав:</h3>
        <ul className={`my-custom-scroll  ${Style.ulIngredients}`}>
          {uniqueIngredientsArray.map(({ item, quantity }) => (
            <li key={item._id} className={Style.listOrderPage}>
              <div className={Style.sum}>
                <IngredientImage img={item.image} name={item.name} />
                {item.name}
              </div>
              <div className={`text_type_digits-default ${Style.number}`}>
                {quantity} x {item.price} <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={Style.listOrderPage}>
        <span className={Style.orderDate}>{dateOrder()}</span>
        <span className={`text_type_digits-default ${Style.number}`}>{total} <CurrencyIcon type={"primary"} /></span>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
