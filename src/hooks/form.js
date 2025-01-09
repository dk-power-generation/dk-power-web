
import { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('No validation errors, calling callback');
      callback(values);
    } else {
      console.log('Validation errors:', validationErrors);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;