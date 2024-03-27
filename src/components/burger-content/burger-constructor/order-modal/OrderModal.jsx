import React from "react";
import done from "../../../../images/done.png";
import OrderModalStyles from './OrderModal.module.css'

const OrderModal = () => {
  return (
    <div  className={OrderModalStyles.container}>
      <div>
        <h2 className={`${OrderModalStyles.number} text text_type_digits-large`}>034536</h2>
        <span>идентификатор заказа</span>
      </div>
      <img src={done} alt="order is done" />
      <div>
        <p>Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  );
};

export default OrderModal;
