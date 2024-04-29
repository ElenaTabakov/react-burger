import React, { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { BASE_URL } from "../../utils/API";
import { request } from "../../utils/requests";
import { Navigate } from "react-router-dom";

const ForgotPassword = () => {
  const [form, setValue] = useState({ email: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const forgotPassword = async ({ email }) => {
    try {
      const res = await request(`${BASE_URL}/password-reset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.success) {
        setSuccess(true);
        localStorage.setItem("visited", true);
      }
    } catch (err) {
      setError(err);
      console.error("Error occurred during password reset:", err);
    }
  };
  const handleChangeInput = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };
  const handleClickSend = (e) => {
    e.preventDefault();
    forgotPassword(form);
  };

  if (success) {
    return <Navigate to="/reset-password"  />;
  }

  return (
    <Form title={"Forgot Password"}>
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
      <Button
        onClick={handleClickSend}
        htmlType="submit"
        type="primary"
        size="medium"
      >
        Send
      </Button>
      {error && <p>{error}</p>}
    </Form>
  );
};

export default ForgotPassword;
