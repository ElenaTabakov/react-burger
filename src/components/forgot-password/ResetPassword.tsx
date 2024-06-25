import { FormEvent, useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/Form";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../utils/API";
import { request } from "../../utils/requests";
import { useForm } from "../../utils/hooks/useForm";


type IFormProps = {
  password: string;
  token: string;
}

const ResetUserPassword = () => {
  const { handleChange, values } = useForm<IFormProps>({ password: "", token: "" });
  const [success, setSuccess] = useState(false);

  const resetPassword = async ({ password, token } : IFormProps ) : Promise<IFormProps | void> => {
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

  const handleClickSend = (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    resetPassword(values);
  };

  if (success) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Form title={"Reset password"} onSubmit={handleClickSend}>
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={handleChange}
        value={values.token}
        name={"token"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        onPointerEnterCapture
        onPointerLeaveCapture
      />
      <Button htmlType="submit" type="primary" size="medium">
        Reset
      </Button>
    </Form>
  );
};

export default ResetUserPassword;
