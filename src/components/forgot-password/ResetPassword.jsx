import { useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../utils/API";
import { request } from "../../utils/requests";

const ResetUserPassword = () => {
  const [form, setValue] = useState({  password: "" , token: ""});
  const [success, setSuccess] = useState(false);

  const resetPassword = async ({ password, token }) => {
    try {
      const res = await request(`${BASE_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });
      if (res.success) {
        setSuccess(true);
        localStorage.removeItem("visited");
      }
    } catch (err) {
      console.error("Error occurred during password reset:", err);
    }
  };

  const handleChangeInput = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleClickSend = (e) => {
    e.preventDefault();
    resetPassword(form)
  };

  if (success) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Form title={"Reset password"}>
      <PasswordInput
        onChange={handleChangeInput}
        value={form.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={handleChangeInput}
        value={form.token}
        name={"token"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Button
        onClick={handleClickSend}
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Reset
      </Button>
    </Form>
  );
};

export default ResetUserPassword;
