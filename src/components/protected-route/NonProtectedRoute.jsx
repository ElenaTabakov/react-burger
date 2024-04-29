import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const NonProtectedRoute = ({component}) => {
  const { isAuth } = useSelector((state) => state.user);

  return isAuth ? <Navigate to="/" replace />  : component ;
};

export default NonProtectedRoute;
