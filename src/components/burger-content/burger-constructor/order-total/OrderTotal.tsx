import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/Modal";
import OrderDetails from "../order-modal/OrderDetails";
import OrderTotalStyles from "./OrderTotal.module.css";
import { useModal } from "../../../../utils/hooks/useModal";
import {
  createOrder,
  clearOrderDetails,
} from "../../../../services/slices/orderSlice";
import { RootState, useDispatch, useSelector } from "../../../../services/store";
import { Loader } from "../../../loader";
import {  useNavigate } from "react-router-dom";



const OrderTotal = ({ total  } : {total:number}) => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { ingredients, isLoading } = useSelector(
    (state: RootState) => state.order
  );
  const { isAuth } = useSelector((state: RootState) => state.user);
  const { bun } = useSelector((state : RootState) => state.constructorBurger);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenOrderModal = () => {
    if (!isAuth) {
      return navigate("/login", { replace: true });
    }
   
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
          <span>{total ? total : "0"}</span> <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenOrderModal}
          disabled={bun && bun.length ? false : true}
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

export default OrderTotal;
