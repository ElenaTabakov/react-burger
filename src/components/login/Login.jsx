import React, { useState } from "react";
import {
  Input,
  PasswordInput,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../services/slices/userSlice";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [form, setValue] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const location = useLocation();
  const navRedirect = location.state && location.state.from 

  const handleChangeInput = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickLogin = (e) =>{
    e.preventDefault();
    dispatch(loginUser(form,navRedirect ? navRedirect : ''))
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
