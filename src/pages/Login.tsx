import { useState } from "react";
import { Link } from "react-router-dom";
import FormTemplate from "../ui/FormTemplate";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <FormTemplate
      heading="Welcome Back !"
      subheading="Sign in to continue to Chatly."
    >
      <LoginForm />
    </FormTemplate>
  );
}

export default Login;
