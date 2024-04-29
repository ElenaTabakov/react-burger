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

const UserProfile = () => {
  const [isChanged, setIsChanged] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleChangeInput = (e) => {
    setIsChanged(true);
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const handleClickSave = (e) => {
    e.preventDefault();
    dispatch(editUserProfile(form));
  };
  const handleClickCancel = () => {
    setValue({ name: user.name, email: user.email, password: "" });
    setIsChanged(false);
  };
  return (
    <div className={ProfileStyles.container}>
      <SideBar />
      <div>
        <Form>
          <Input
            type={"text"}
            placeholder={"Name"}
            onChange={handleChangeInput}
            value={form.name}
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
            value={form.email}
            name={"email"}
            icon={"EditIcon"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
          <PasswordInput
            onChange={handleChangeInput}
            value={form.password}
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
              <Button
                onClick={handleClickSave}
                htmlType="submit"
                type="primary"
                size="medium"
              >
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
