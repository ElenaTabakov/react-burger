import Login from "../components/login/Login";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { RootState, useSelector } from "../services/store";
import { Loader } from "../components/loader";


const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuth, isLoading } = useSelector((state : RootState) => state.user);

  const onClick = (dest : string) => {
    navigate(`/${dest}`);
  };

  if (isAuth) {
    return (
      <>
        {isLoading && <Loader />}
        <Navigate to="/" />
      </>
    );
  }

  return (
    <div className="t-center">
      {isLoading && <Loader />}
      <Login />
      <p className="mt-8  mb-1">
        Вы — новый пользователь?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => onClick("register")}
          extraClass="p-2 pt-1 pb-1"
        >
          Зарегистрироваться
        </Button>
      </p>
      <p className="m-1">
        Забыли пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => onClick("forgot-password")}
          extraClass="p-2  pt-1 pb-1"
        >
          Восстановить пароль
        </Button>
      </p>
    </div>
  );
};

export default LoginPage;
