import { useState } from "react"

export const useForm = (inputValues = {}) => {
    const [values, setValues] = useState(inputValues);

    const handleChange = (e) => {
        setValues({...values, [e.target.name] : e.target.value})
    }

    return {handleChange, values , setValues};
}
