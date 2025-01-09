import { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    console.log('handleSubmit called');
    const validationErrors = [];
    // const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log('No validation errors, calling callback');
      callback(values);
    } else {
      console.log('Validation errors:', validationErrors);
    }
  };

  const setValues = (newValues) => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...(typeof newValues === 'function' ? newValues(prevValues) : newValues)
    }));
  };

  return { values, errors, handleChange, handleSubmit, setValues };
};

export default useForm;