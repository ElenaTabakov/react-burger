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
import { Loader } from "../../../loader";
import {  useNavigate } from "react-router-dom";
import { IOrder ,IBurgerConstructor, IUser } from "../../../../utils/types/types";


interface IAppOrderState {
  order: IOrder;
}
interface IAppUserState {
  user: IUser;
}
interface IAppConstructorState {
  constructorBurger: IBurgerConstructor;
}

const OrderTotal = ({ total  } : {total:number}) => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { ingredients, isLoading } = useSelector(
    (state: IAppOrderState) => state.order
  );
  const { isAuth } = useSelector((state: IAppUserState) => state.user);
  const { bun } = useSelector((state : IAppConstructorState) => state.constructorBurger);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenOrderModal = () => {
    if (!isAuth) {
      console.log('click')
      return navigate("/login", { replace: true });
    }
    //@ts-ignore
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
          disabled={bun.length ? false : true}
        >
          Оформить заказ
        </Button>
      </div>

      {isOpenModal && (
        <Modal onClose={handleCloseOrderModal}>
          {isLoading && <Loader />}
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
