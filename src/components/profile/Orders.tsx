import React, { useEffect } from "react";
import SideBar from "./SideBar";
import ProfileStyles from "./UserProfile.module.css";
import { AppDispatch, RootState, useDispatch, useSelector } from "../../services/store";
import OrderCard from "../feed/OrderCard";
import { Link, useLocation } from "react-router-dom";

const Orders = () => {
  const userOrders = useSelector(
    (state: RootState) => state.userOrders.userOrders.orders
  );
  const dispatch = useDispatch();
  const location = useLocation();
  
  const accessToken = localStorage
    .getItem("accessToken")
    ?.replace("Bearer ", "");

  useEffect(() => {
    if (accessToken) {
      dispatch({
        type: "userOrders/wsConnect",
        payload: `wss://norma.nomoreparties.space/orders?token=${accessToken}`,
      });

      return () => {
        dispatch({ type: "userOrders/wsDisconnect" });
      };
    }
  }, [dispatch, accessToken]);

  return (
    <div className={ProfileStyles.container}>
      <SideBar />
      <div>
        {userOrders.length && (
          <ul className={ProfileStyles.wrapperOrders}>
            {userOrders.map((order) => (
              <li key={order.number}>
                <Link
                  to={`/profile/orders/${order.number}`}
                  state={{ background: location }}
                  className={ProfileStyles.link}
                >
                  <OrderCard key={order.number} {...order} showStatus />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
