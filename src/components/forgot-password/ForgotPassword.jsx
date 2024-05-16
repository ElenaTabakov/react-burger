import React, { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { BASE_URL } from "../../utils/API";
import { request } from "../../utils/requests";
import { Navigate } from "react-router-dom";
import { useForm } from "../../utils/hooks/useForm";

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {handleChange, values} = useForm({ email: "" })

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

  const handleClickSend = (e) => {
    e.preventDefault();
    forgotPassword(values);
  };

  if (success) {
    return <Navigate to="/reset-password"  />;
  }

  return (
    <Form title={"Forgot Password"} onSubmit={handleClickSend}>
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
      <Button
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
