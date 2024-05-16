import React from "react";

const FormError = ({ children, className }) => {
  return <p className={`mt-3 text-red-500 ${className}`}>{children}</p>;
};

export default FormError;
