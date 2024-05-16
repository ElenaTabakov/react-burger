import React from "react";
import done from "../../../../images/done.png";
import OrderDetailsStyles from "./OrderDetails.module.css";
import { useSelector } from "react-redux";
import { Loader } from "../../../loader";

const OrderDetails = () => {
  const { order ,isLoading } = useSelector((state) => state.order);

  if (!order.success) {
    return;
  }

  return (
    <div className={OrderDetailsStyles.container}>
      <div>
        <h2
          className={`${OrderDetailsStyles.number} text text_type_digits-large`}
        >
          {isLoading && Loader }
          {!isLoading && order.order.number}
          
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
