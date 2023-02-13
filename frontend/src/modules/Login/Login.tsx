import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import AuthCard from "../shared/AuthCard/AuthCard";
import { loginUser } from "./Login.service";
import { useAuth } from "../providers/AuthProvider";
import { INVALID_CREDENTIAS_TEXT } from "../../utils/constants";

const Login = () => {
  const auth: any = useAuth();
  const navigate = useNavigate();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Not a valid email!",
    },
  };
  const onFinish = (values: any) => {
    loginUser(values["email"], values["password"])
      .then((data: any) => {
        auth.login(data);
        navigate("/");
      })
      .catch(() => {
        message.error(INVALID_CREDENTIAS_TEXT);
      });
  };

  return (
    <AuthCard>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        validateMessages={validateMessages}
        onSubmitCapture={(e) => {
          e.preventDefault();
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Typography.Text>
          Not a member? <Link to="/register">Sign up</Link>
        </Typography.Text>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default Login;
