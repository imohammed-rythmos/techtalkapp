import React from "react";
import InputText from "./InputText";

const LoginForm = ({
  userName,
  password,
  updateUserName,
  updatePassword,
  handleLogin,
  handleRegister
}) => {
  return (
    <div className="form-group">
      <InputText
        fieldName="User Name"
        fieldType="text"
        fieldValue={userName}
        onChangHandler={updateUserName}
      />
      <InputText
        fieldName="Password"
        fieldType="password"
        fieldValue={password}
        onChangHandler={updatePassword}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default LoginForm;
