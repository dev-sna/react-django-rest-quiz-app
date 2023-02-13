import React, { useEffect, useState } from "react";
import { Row, Typography, Layout, Col, Button, message } from "antd";
import { List } from "antd";
import { Link } from "react-router-dom";

import NoQuizzes from "./components/NoQuizzes/NoQuizzes";
import QuizListItem from "./components/QuizListItem/QuizListItem";

import "./Quizzes.css";
import { getUserQuizzes, publishQuiz, deleteQuiz } from "./Quizzes.service";
import { Quiz } from "../types";
import {
  QUIZ_DELETE_SUCCESS_TEXT,
  QUIZ_PUBLISH_SUCCESS_TEXT,
} from "../../utils/constants";

const { Title } = Typography;
const { Content } = Layout;

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);
  useEffect(() => {
    getUserQuizzes().then((res: any) => {
      setQuizzes(res);
    });
  }, []);

  const onPublishQuiz = (id: number) => {
    publishQuiz(id).then((publishedQuiz: any) => {
      message.info(QUIZ_PUBLISH_SUCCESS_TEXT);
      let updated_quizzes = quizzes.map((quiz) => {
        if (quiz.id === publishedQuiz.id) {
          quiz = { ...quiz, ...publishedQuiz };
        }
        return quiz;
      });
      setQuizzes([...updated_quizzes]);
    });
  };

  const onDeleteQuiz = (id: number) => {
    deleteQuiz(id).then(() => {
      message.info(QUIZ_DELETE_SUCCESS_TEXT);
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    });
  };

  return (
    <Layout className="quizzes-layout">
      <Content>
        <Row justify="space-between">
          <Title level={3}>Your Quizzes</Title>
          <Link to="/create-quiz">
            <Button type="link" block>
              Create Quiz
            </Button>
          </Link>
        </Row>
        <Row>
          <Col span={24}>
            {quizzes.length ? (
              <List
                className="quiz-list"
                dataSource={quizzes}
                renderItem={(item: Quiz) => {
                  return (
                    <QuizListItem
                      title={item.title}
                      id={item.id}
                      quizPermalink={item.quizPermalink}
                      isPublished={item.isPublished}
                      onConfirmPublish={() => onPublishQuiz(item.id as number)}
                      onConfirmDelete={() => onDeleteQuiz(item.id as number)}
                    />
                  );
                }}
                itemLayout="horizontal"
                // itemLayout="vertical"
              ></List>
            ) : (
              <NoQuizzes />
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Quizzes;
