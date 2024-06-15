import React, {FormEvent} from "react";
import Styles from "./Form.module.css";

interface IFormProps {
  title? : string;
  children: React.ReactNode;
  onSubmit: ( e: FormEvent<HTMLFormElement>) => void
}

const Form = ({ title, children, onSubmit } : IFormProps) => {
  return (
    <form className={Styles.form} onSubmit={onSubmit}>
      {title && <h2>{title}</h2>}
      {children}
    </form>
  );
};

export default Form;
