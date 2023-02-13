import React from "react";
import {
  Row,
  Col,
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Avatar,
} from "antd";
import QuizLogo from "../../../static/images/quiz_app.jpeg";

import "./AuthCard.css";

const { Content } = Layout;

const AuthCard = ({ children }: any) => {
  return (
    <Content className="auth-container">
      <Row className="auth-row" align="middle" justify="space-around">
        <Col xs={{ span: 20 }} sm={{ span: 12 }} lg={{ span: 7 }}>
          <Card
            cover={<img alt="example" className="card-image" src={QuizLogo} />}
          >
            {children}
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default AuthCard;
