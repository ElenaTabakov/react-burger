import React, { useState } from "react";
import SideBar from "./SideBar";
import Form from "../form/Form";
import {
  Button,
  Input,
  PasswordInput,
  EditIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileStyles from "./UserProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../services/slices/userSlice";
import { useForm } from "../../utils/hooks/useForm";

const UserProfile = () => {
  const [isChanged, setIsChanged] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { handleChange, values, setValues } = useForm({
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleChangeInput = (e) => {
    setIsChanged(true);
    handleChange(e);
  };
  const handleClickSave = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(editUserProfile(values));
    setIsChanged(false);
  };
  const handleClickCancel = () => {
    setValues({ name: user.name, email: user.email, password: "" });
    setIsChanged(false);
  };
  return (
    <div className={ProfileStyles.container}>
      <SideBar />
      <div>
        <Form onSubmit={handleClickSave}>
          <Input
            type={"text"}
            placeholder={"Name"}
            onChange={handleChangeInput}
            value={values.name}
            name={"name"}
            icon={"EditIcon"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />
          <Input
            type={"email"}
            placeholder={"Email"}
            onChange={handleChangeInput}
            value={values.email}
            name={"email"}
            icon={"EditIcon"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <PasswordInput
            onChange={handleChangeInput}
            value={values.password}
            name={"password"}
            icon={"EditIcon"}
            placeholder={"Password"}
          />
          {isChanged && (
            <div className={`${ProfileStyles.btnsWrapper} d-flex mt-4`}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={handleClickCancel}
              >
                Cancel
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Save
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UserProfile;
