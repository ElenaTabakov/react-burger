import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../services/slices/userSlice";
import { IUser } from "../../utils/types/types";

interface IProtectedRouteProps {
  component: React.ReactNode;
  onlyUnAuth?: boolean;
}

interface IAppUserState {
  user: IUser;
}

const ProtectedRoute = ({ component,  onlyUnAuth = false  }: IProtectedRouteProps) => {
  const { isAuth} = useSelector((state : IAppUserState) => state.user);
  console.log(isAuth)
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
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return <>{component}</>;
};

export default ProtectedRoute;
