import React, { useState } from "react";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { registerUser } from "../../services/slices/userSlice";
import { useDispatch } from "react-redux";


const RegisterForm = () => {
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };
  return (
    <Form title={"Register"}>
      <Input
        type={"text"}
        placeholder={"Name"}
        onChange={handleChangeInput}
        value={form.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
      <Input
        type={"email"}
        placeholder={"Email"}
        onChange={handleChangeInput}
        value={form.email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <PasswordInput
        onChange={handleChangeInput}
        value={form.password}
        name={"password"}
        placeholder={"Password"}
      />
      <Button
        onClick={handleClickRegister}
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
