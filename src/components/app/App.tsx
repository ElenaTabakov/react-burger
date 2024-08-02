import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPage,
  ProfilePage,
  OrdersPage,
  ResetPasswordPage,
  NotFoundPage,
  FeedPage,
} from "../../pages";
import Layout from "../layout/Layout";
import IngredeientDetails from "../burger-content/burger-ingredients/ingredeient-details/IngredeientDetails";
import Modal from "../modal/Modal";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { useEffect } from "react";
import { getUser } from "../../services/slices/userSlice";
import { useModal } from "../../utils/hooks/useModal";
import OrderDetailsPage from "../feed/OrderDetailsPage";
import { useDispatch } from "../../services/store";

const App = () => {
  const { closeModalRoute } = useModal();
  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
    return;
  }, [dispatch, token]);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth={true} component={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth={true} component={<RegisterPage />} />
            }
          />

          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPage />} />
          <Route path="/ingredients/:id" element={<IngredeientDetails />} />
          <Route path="/feed/" element={<FeedPage />} />
          <Route path="/feed/:number" element={<OrderDetailsPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders/:number"
            element={<ProtectedRoute component={<OrderDetailsPage />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRoute component={<OrdersPage />} />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={closeModalRoute} header={"Детали ингредиента"}>
                <IngredeientDetails />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal onClose={closeModalRoute} >
                <OrderDetailsPage />
              </Modal>
            }
          />
           <Route
            path="/feed/:number"
            element={
              <Modal onClose={closeModalRoute} >
                <OrderDetailsPage />
              </Modal>
            }
          />
        </Routes>
        
      )}
    </>
  );
};

export default App;
