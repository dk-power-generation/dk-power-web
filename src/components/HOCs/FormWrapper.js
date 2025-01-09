import React from 'react';

const FormWrapper = (WrappedComponent) => {
  return function EnhancedForm(props) {
    return (
      <div className="form-container">
        <h2>{props.title}</h2>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default FormWrapper;