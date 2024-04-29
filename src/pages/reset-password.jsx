import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ResetUserPassword from "../components/forgot-password/ResetPassword";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const visited = localStorage.getItem("visited");
  const onClick = (dest) => {
    navigate(`/${dest}`);
  };

  useEffect(() => {
    if (!visited) {
        return navigate("/forgot-password");
      }
  },[visited,navigate])
  
  return (
    <div className="t-center">
      <ResetUserPassword />
      <p>
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => onClick("login")}
          extraClass="p-2"
        >
          Войти
        </Button>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
