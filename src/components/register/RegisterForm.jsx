import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { registerUser } from "../../services/slices/userSlice";
import { useDispatch } from "react-redux";
import { useForm } from "../../utils/hooks/useForm";


const RegisterForm = () => {
  const {handleChange, values} = useForm({ name: "", email: "", password: "" });
  const dispatch = useDispatch();

  const handleClickRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };
  return (
    <Form title={"Register"} onSubmit={handleClickRegister}>
      <Input
        type={"text"}
        placeholder={"Name"}
        onChange={handleChange}
        value={values.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
      <Input
        type={"email"}
        placeholder={"Email"}
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
        placeholder={"Password"}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegisterForm;
