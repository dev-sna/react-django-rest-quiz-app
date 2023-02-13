import React, { useEffect, useState } from "react";
import { Row, Col, Layout, Skeleton } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";

import QuizForm from "../shared/QuizForm/QuizForm";
import { getQuiz, updateQuiz } from "./UpdateQuiz.service";

const { Content } = Layout;
const isEmpty = require("lodash.isempty");

const UpdateQuiz = () => {
  let navigate = useNavigate();
  const [quiz, setQuiz] = useState({});
  const [isLoading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    setLoading(true);
    getQuiz(params.id as string).then((quizData: any) => {
      setQuiz(quizData);
      setLoading(false);
    });
  }, []);

  const onSubmit = (formValues: any) => {
    const id = formValues["id"];
    updateQuiz(id, formValues).then(() => {
      navigate("/");
    });
  };

  return (
    <Layout>
      <Content>
        <Row style={{ padding: "100px" }}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Link to="/">Go back</Link>
            {isLoading && <Skeleton active />}
            {!isEmpty(quiz) ? (
              <QuizForm quizData={quiz} onSubmit={onSubmit} />
            ) : null}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default UpdateQuiz;
