import React, { useState } from "react";

import { Card, Row, Col, Typography, Button, Tag } from "antd";
import { Question } from "../../../types";

const { Title } = Typography;

interface QuestionStepProps {
  question: Question;
  onAnswerUpdate: Function;
}

const QuestionStep = ({ question, onAnswerUpdate }: QuestionStepProps) => {
  const [answers, setAnswers] = useState<Array<number>>([]);

  const onSelectAnswer = (selectedAnswer: number) => {
    if (question.hasMultipleAnswers) {
      if (answers.includes(selectedAnswer)) {
        setAnswers(answers.filter((answer) => answer !== selectedAnswer));
        return;
      }
      setAnswers([...answers, selectedAnswer]);
    } else setAnswers([selectedAnswer]);
    onAnswerUpdate(question.id, selectedAnswer, question.hasMultipleAnswers);
  };

  const getButtonType = (id: number) => {
    return answers.includes(id) ? "primary" : "default";
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <Card style={{ height: "auto", marginTop: "20px" }}>
          {question.hasMultipleAnswers ? (
            <Tag color="blue">Multiple Answers</Tag>
          ) : null}
          <Title level={5}>{question.statement}</Title>
          <Row className="answers-container" justify="space-between">
            {question.answers.map((answer: any) => {
              return (
                <Button
                  key={answer.id}
                  className="answer-button"
                  type={getButtonType(answer.id)}
                  shape="round"
                  size={"large"}
                  onClick={() => onSelectAnswer(answer.id)}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {answer.content}
                </Button>
              );
            })}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default QuestionStep;
