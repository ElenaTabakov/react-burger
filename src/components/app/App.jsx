import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPage,
  ProfilePage,
  OrdersPage,
  ResetPasswordPage,
} from "../../pages";
import Layout from "../layout/Layout";
import IngredeientDetails from "../burger-content/burger-ingredients/ingredeient-details/IngredeientDetails";
import Modal from "../modal/Modal";
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../services/slices/userSlice";
import NonProtectedRoute from "../protected-route/NonProtectedRoute";

const App = () => {
  const navigate = useNavigate();
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

  const handleCloseModal = () => {
    navigate(-1);
  };
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/login"
            element={<NonProtectedRoute component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<NonProtectedRoute component={<RegisterPage />} />}
          />

          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPage />} />
          <Route path="/ingredients/:id" element={<IngredeientDetails />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={<ProfilePage />} />}
          />
          <Route
            path="/profile/orders"
            element={<ProtectedRoute component={<OrdersPage />} />}
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={handleCloseModal} header={"Детали ингредиента"}>
                <IngredeientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
