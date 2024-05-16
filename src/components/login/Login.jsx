import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/slices/userSlice";
import { useForm } from "../../utils/hooks/useForm";

const Login = () => {
  const dispatch = useDispatch();
  const { handleChange, values } = useForm({ email: "", password: "" });

  const handleClickLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <Form title={"Login"} onSubmit={handleClickLogin}>
      <Input
        type={"email"}
        placeholder={"email"}
        onChange={handleChange}
        value={values.email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
    </Form>
  );
};

export default Login;
