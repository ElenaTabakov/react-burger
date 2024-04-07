import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/Modal";
import OrderDetails from "../order-modal/OrderDetails";
import OrderTotalStyles from "./OrderTotal.module.css";
import PropTypes from "prop-types";
import { useModal } from "../../../../utils/hooks/useModal";
import {
  createOrder,
  clearOrderDetails,
} from "../../../../services/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const OrderTotal = ({ total }) => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { ingredients } = useSelector((state) => state.order);
  const { bun } = useSelector((state) => state.constructorBurger);
  const dispatch = useDispatch();

  const handleOpenOrderModal = () => {
    dispatch(createOrder(ingredients));
    openModal();
  };
  const handleCloseOrderModal = () => {
    dispatch(clearOrderDetails());
    closeModal();
  };

  return (
    <div>
      <div className={OrderTotalStyles.container}>
        <div className={OrderTotalStyles.total}>
          <span>{total ? total : "0"}</span> <CurrencyIcon />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenOrderModal}
          disabled={bun.length ? false : true}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};
OrderTotal.propTypes = {
  total: PropTypes.number,
};
export default OrderTotal;
