import React from "react";
import { Layout, Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../shared/AuthCard/AuthCard";
import { registerUser } from "./Register.service";
import { useAuth } from "../providers/AuthProvider";
import { INVALID_CREDENTIAS_TEXT } from "../../utils/constants";

const Register = () => {
  const auth: any = useAuth();
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Not a valid email!",
    },
  };
  const onFinish = (values: any) => {
    const { firstName, lastName, email, password } = values;
    registerUser(firstName, lastName, email, password)
      .then((data: any) => {
        auth.login(data);
        navigate("/");
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  return (
    <AuthCard>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        onSubmitCapture={(e) => {
          e.preventDefault();
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="First name"
          name="firstName"
          rules={[{ required: true, type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[{ required: true, type: "string" }]}
        >
          <Input />
        </Form.Item>
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
          Already a member? <Link to="/login">Sign in</Link>
        </Typography.Text>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
};

export default Register;
