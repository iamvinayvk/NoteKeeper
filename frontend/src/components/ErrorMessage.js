import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} className="my-2" style={{ fontSize: 20 }}>
      <strong className="text-white">{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
