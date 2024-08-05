import React, { useEffect, useState } from "react";
import done from "../../../../images/done.png";
import OrderDetailsStyles from "./OrderDetails.module.css";
import { Loader } from "../../../loader";
import { RootState, useSelector } from "../../../../services/store";
import { IOrder } from "../../../../utils/types/types";

const OrderDetails = () => {
  const { isLoading, order, isSuccess } = useSelector((state: RootState) => state.order); 
  const [orderIsDone, setOrderIsDone] = useState<IOrder | null>(null);

  useEffect(() => {
    if (order && Object.keys(order).length > 0 && isSuccess) {
      setOrderIsDone(order.order);
    }
  }, [order, isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  if (!orderIsDone || !orderIsDone.number) {
    return null;
  }

  return (
    <div className={OrderDetailsStyles.container}>
      <div>
        <h2
          className={`${OrderDetailsStyles.number} text text_type_digits-large`}
        >
          {orderIsDone.number}
        </h2>
        <span>идентификатор заказа</span>
      </div>
      <img src={done} alt="order is done" />
      <div>
        <p>Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
