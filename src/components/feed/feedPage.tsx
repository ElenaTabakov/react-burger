import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";

const FeedPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.ordersData.orders);
  const userOrders = useSelector((state) => state.userOrders.userOrders);
  const ordersStatus = useSelector((state) => state.feed.status);
  const userOrdersStatus = useSelector((state) => state.userOrders.status);
  console.log(orders , 'store logs')

  useEffect(() => {
    dispatch({
      type: "orders/wsConnect",
      payload: "wss://norma.nomoreparties.space/orders/all",
    });
    // dispatch({
    //   type: "userOrders/connect",
    //   payload: "wss://norma.nomoreparties.space/orders/all",
    // });

    return () => {
      dispatch({ type: "orders/wsDisconnect" });
      dispatch({ type: "userOrders/disconnect" });
    };
  }, [dispatch]);

  return (
    <div>Feed
       {orders.length && (
        <ul>
        {orders.map((order) => (
            <li key={order.number}>{order.number}</li>
          ))}
        </ul>
      )} 
    </div>
  );
};

export default FeedPage;
