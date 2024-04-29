import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/slices/userSlice";

const ProtectedRoute = ({ component }) => {
  const { isAuth} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return isAuth ? component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
