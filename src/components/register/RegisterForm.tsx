import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { registerUser } from "../../services/slices/userSlice";
import { useDispatch } from "../../services/store";
import { useForm } from "../../utils/hooks/useForm";
import { FormEvent } from "react";

interface IFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { handleChange, values } = useForm<IFormValues>({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleClickRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };
  return (
    <Form title={"Register"} onSubmit={handleClickRegister}>
      <Input
        type={"text"}
        placeholder={"Name"}
        onChange={handleChange}
        value={ values.name ||  ''}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
        onPointerEnterCapture 
        onPointerLeaveCapture
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
        onPointerEnterCapture 
        onPointerLeaveCapture
      />
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        placeholder={"Password"}
      />
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegisterForm;
