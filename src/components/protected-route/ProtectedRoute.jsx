import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../services/slices/userSlice";

const ProtectedRoute = ({ component,  onlyUnAuth = false  }) => {
  const { isAuth} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if(isAuth && onlyUnAuth){  
    const { from } = location.state || { from: { pathname: "/" } };
    return  <Navigate to={from} replace/>;
  }

  if(!isAuth && !onlyUnAuth){
    return <Navigate to="/login" state={{from: location}}/>
  }

  return component;
};

export default ProtectedRoute;
