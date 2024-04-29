import React, { useState } from "react";
import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/slices/userSlice";

const Login = () => {
  const [form, setValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.name ,e.target.value );
  };

  const handleClickLogin = (e) =>{
    e.preventDefault();
    console.log(form)
    dispatch(loginUser(form))
  }

  return (
    <Form title={"Login"}>
      <Input
        type={"email"}
        placeholder={"email"}
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
      />
      <Button onClick={handleClickLogin} htmlType="submit" type="primary" size="medium" >Войти</Button>
    </Form>
  );
};

export default Login;
