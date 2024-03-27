import React, { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/Modal";
import OrderModal from "../order-modal/OrderModal";
import OrderTotalStyles from "./OrderTotal.module.css";
import PropTypes from "prop-types";

const OrderTotal = ({ total }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className={OrderTotalStyles.container}>
        <div className={OrderTotalStyles.total}>
          <span>{total ? total : '0'}</span> <CurrencyIcon />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => setShowModal(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <OrderModal />
        </Modal>
      )}
    </div>
  );
};
OrderTotal.propTypes = {
  total: PropTypes.number,
};
export default OrderTotal;
