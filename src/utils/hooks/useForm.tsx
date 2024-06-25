import { ChangeEvent, useState } from "react";

interface IUseForm<T> {
  values: T ;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues : (state: T) => void;
}
export const useForm = <T extends Record<string , any>>(inputValues: T): IUseForm<T> => {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return { handleChange, values, setValues };
};
