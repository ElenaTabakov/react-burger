import ForgotPassword from "../components/forgot-password/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPage = () => {
  const navigate = useNavigate();
  const onClick = (dest : string) : void => {
    navigate(`/${dest}`);
  };
  return (
    <div className="t-center">
      <ForgotPassword />
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

export default ForgotPage;
