import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Steps, Button, Layout, Row, Col, Typography } from "antd";

import { getQuizByUUID, submitQuiz } from "./TakeQuiz.service";
import { Question, Quiz } from "../types";

import QuestionStep from "./components/QuestionStep/QuestionStep";

import "./TakeQuiz.css";

const isEmpty = require("lodash.isempty");
const { Step } = Steps;
const { Title } = Typography;

const TakeQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz>();
  const [quizAnswers, setQuizAnswers] = useState<any>({});
  const [isResultFetched, setResultFetched] = useState(false);
  const [result, setResult] = useState<any>({});

  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState<any>([]);

  const params = useParams();

  const onAnswerUpdate = (
    questionId: number,
    selectedAnswer: number,
    hasMultipleAnswers: boolean
  ) => {
    setQuizAnswers((prev: any) => {
      console.log("prev: ", prev);
      let updatedAnswers: Array<number> = [];
      if (!prev[questionId]) {
        updatedAnswers = [selectedAnswer];
      } else {
        if (hasMultipleAnswers) {
          if (prev[questionId].includes(selectedAnswer)) {
            updatedAnswers = prev[questionId].filter(
              (answer: number) => answer !== selectedAnswer
            );
          } else {
            updatedAnswers = [...prev[questionId], selectedAnswer];
          }
        }
      }
      const updatedSelection = {
        [questionId]: updatedAnswers,
      };
      return { ...prev, ...updatedSelection };
    });
  };

  useEffect(() => {
    const uuid = params["quiz_uuid"];
    getQuizByUUID(uuid as string).then((quizResponse: any) => {
      setQuiz(quizResponse);
      setSteps(getSteps(quizResponse));
    });
  }, []);

  const getSteps = (quizResponse: any) => {
    return (
      !isEmpty(quizResponse) &&
      ((quizResponse as Quiz).questions as Array<Question>).map(
        (question, index) => {
          return {
            title: "",
            content: (
              <QuestionStep
                onAnswerUpdate={onAnswerUpdate}
                question={question}
              />
            ),
          };
        }
      )
    );
  };

  const onSubmitQuiz = (answersData: any) => {
    submitQuiz(quiz?.id as number, answersData).then((response) => {
      setResultFetched(true);
      setResult(response);
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };
  return (
    <Layout className="take-quiz-container">
      <Row justify="center" align="middle">
        {!isResultFetched ? (
          <Col xs={{ span: 22 }} sm={{ span: 12 }}>
            {!isEmpty(steps) && (
              <>
                <Steps current={current}>
                  {steps.map((item: any) => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
              </>
            )}
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => onSubmitQuiz(quizAnswers)}
                >
                  Done
                </Button>
              )}
            </div>
          </Col>
        ) : (
          <Title>
            You scored {result?.achievedScore} out of {result?.totalScore}
          </Title>
        )}
      </Row>
    </Layout>
  );
};

export default TakeQuiz;
