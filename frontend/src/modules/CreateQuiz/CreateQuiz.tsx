import React from "react";
import { Row, Col, Layout, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

import QuizForm from "../shared/QuizForm/QuizForm";
import { createQuiz } from "./CreateQuiz.service";
import { QUIZ_CREATE_SUCCESS_TEXT } from "../../utils/constants";

import "./CreateQuiz.css";

const { Content } = Layout;

const CreateQuiz = () => {
  let navigate = useNavigate();

  const onSubmit = (formValues: any) => {
    createQuiz(formValues).then(() => {
      message.info(QUIZ_CREATE_SUCCESS_TEXT);
      navigate("/");
    });
  };

  return (
    <Layout>
      <Content className="create-quiz-container">
        <Row>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Link to="/">Go back</Link>
            <QuizForm quizData={{}} onSubmit={onSubmit} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CreateQuiz;
