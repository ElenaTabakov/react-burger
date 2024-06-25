import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import RegisterForm from "../components/register/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const onClick = (dest : string) => {
    navigate(`/${dest}`);
  };
  return (
    <div className="t-center">
      <RegisterForm />
      <p className="mt-8 mb-1">
        Уже зарегистрированы?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => onClick("login")}
          extraClass="p-2  pt-1 pb-1"
        >
          Войти
        </Button>
      </p>
    </div>
  );
};

export default RegisterPage;
