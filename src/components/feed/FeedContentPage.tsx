import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import Style from "./FeedPage.module.css";
import OrderCard from "./OrderCard";
import { Link, useLocation } from "react-router-dom";
import { v4 as UUID } from "uuid";

const FeedContentPage = () => {
  const dispatch = useDispatch();
  const ordersStatus = useSelector((state) => state.feed.status);
  const location = useLocation();
  const { total, totalToday, orders } = useSelector(
    (state) => state.feed.ordersData
  );

  const ordersDone = orders.filter((item) => item.status === "done");
  const ordersCreated = orders.filter((item) => item.status === "pending");

  useEffect(() => {
    dispatch({
      type: "orders/wsConnect",
      payload: "wss://norma.nomoreparties.space/orders/all",
    });

    return () => {
      dispatch({ type: "orders/wsDisconnect" });
    };
  }, [dispatch]);

  return (
    <>
      <h2 className="text_type_main-large">Лента заказов</h2>
      <div className={Style.pageContainer}>
        <div>
          {orders.length && (
            <ul className={Style.wrapperOrders}>
              {orders.slice(0, 20).map((order) => (
                <li key={UUID()}>
                  <Link 
                  to={`/feed/${order.number}`}
                  state={{background: location}}
                  className={Style.link}
                  >        
                  <OrderCard key={order.number} {...order} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className={Style.ordersListWrapper}>
            <div>
              <h3 className="text_type_main-medium">Готовы:</h3>
              {orders.length && (
                <ul className={Style.ordersList}>
                  {ordersDone.slice(0, 20).map((order) => (
                    <li
                      key={UUID()}
                      className={` text_type_digits-default ${Style.orderDone}`}
                    >
                      {order.number}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3 className="text_type_main-medium">В работе:</h3>
              {orders.length && (
                <ul>
                  {ordersCreated.slice(0, 20).map((order) => (
                    <li key={UUID()} className="text_type_digits-default">{order.number}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p className="text text_type_digits-large text-shadow"> {total} </p>
          </div>
          <div>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p className="text text_type_digits-large text-shadow">
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedContentPage;
