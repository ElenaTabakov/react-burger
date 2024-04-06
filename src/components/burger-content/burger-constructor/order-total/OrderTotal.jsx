import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/Modal";
import OrderDetails from "../order-modal/OrderDetails";
import OrderTotalStyles from "./OrderTotal.module.css";
import PropTypes from "prop-types";
import { useModal } from "../../../../utils/hooks/useModal";
import { createOrder } from "../../../../services/slices/orderSlice"; 
import { useDispatch, useSelector } from "react-redux";

const OrderTotal = ({ total }) => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const {ingredients} = useSelector(state => state.order)
  const dispatch = useDispatch()

  const handleOpenOrderModal = () => {
    dispatch(createOrder(ingredients));
    openModal()
  }

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
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenModal && (
        <Modal onClose={closeModal}>
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
