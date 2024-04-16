import React, { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Login = ({ title }) => {
  const [form, setValue] = useState({});

  const handleChangeInput = (e) => {
     setValue({...form, [e.target.name] : e.target.value})
  }
  return (
    <form>
      <h2>{title}</h2>
      <Input
        type={"text"}
        placeholder={"placeholder"}
        onChange={handleChangeInput}
        // value={value}
        name={"name"}
        error={false}
        // ref={inputRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="ml-1"
      />
    </form>
  );
};
Login.propTypes = {
  title: PropTypes.string,
};
export default Login;
