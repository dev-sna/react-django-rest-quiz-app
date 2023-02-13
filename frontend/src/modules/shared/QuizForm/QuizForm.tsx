import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Form,
  Typography,
  Checkbox,
  Divider,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AnswersForm from "./components/AnswersForm";

const { Title } = Typography;

const data = {
  title: "Quiz 1",
  questions: [
    {
      statement: "Is horse an animal?",
      answers: [
        {
          content: "Yes",
          is_true: true,
        },
        {
          content: "No",
          is_true: false,
        },
      ],
    },
    {
      statement: "What's 66 divided by 6?",
      answers: [
        {
          content: "11",
          is_true: true,
        },
        {
          content: "10",
          is_true: false,
        },
      ],
    },
  ],
};

const renderHiddenField = (name: any) => {
  return name ? (
    <Form.Item hidden name={name}>
      <Input />
    </Form.Item>
  ) : null;
};

const QuizForm = ({ quizData, onSubmit }: any) => {
  const [quiz, setQuiz] = useState(quizData);

  useEffect(() => {
    setQuiz(quizData);
  }, []);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      initialValues={quiz}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      style={{ marginTop: "20px" }}
    >
      <Form.Item
        label="Quiz title"
        name="title"
        rules={[
          {
            required: true,
            type: "string",
            message: "Title must not be empty.",
          },
        ]}
      >
        <Input />
      </Form.Item>
      {renderHiddenField("id")}
      <Row justify="space-between">
        <Col span={24}>
          <Row justify="space-between">
            <Title level={5}>Question</Title>
            {/* <Button>Add Question</Button> */}
          </Row>
          <Form.List name="questions">
            {(questions, { add: addQuestion, remove: removeQuestion }) => {
              return (
                <div>
                  {questions.map((question: any, index) => {
                    return (
                      <div key={`question-${question.key}`}>
                        <Divider orientation="left"></Divider>
                        <Row justify="space-between">
                          <p>Question {index + 1}</p>
                          <MinusCircleOutlined
                            onClick={() => {
                              removeQuestion(question.name);
                            }}
                          />
                        </Row>
                        <Form.Item
                          {...question}
                          name={[question.name, "statement"]}
                          fieldKey={[question.fieldKey, "statement"]}
                          rules={[
                            {
                              required: true,
                              message: "Question statement is required.",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        {renderHiddenField([question.name, "id"])}
                        <Form.Item>
                          <AnswersForm fieldKey={question.name} />
                        </Form.Item>
                      </div>
                    );
                  })}
                  {questions.length ? (
                    <Divider orientation="center">END</Divider>
                  ) : null}
                  <Button
                    type="dashed"
                    onClick={() => {
                      addQuestion();
                    }}
                    block
                    disabled={questions.length == 10}
                  >
                    Add Question
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </Col>
      </Row>
      <Divider orientation="center"></Divider>
      <Row>
        <Col>
          <Button type="primary" htmlType="submit">
            Save Quiz
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default QuizForm;
