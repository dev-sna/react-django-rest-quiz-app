import React from "react";
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
import { MinusCircleOutlined } from "@ant-design/icons";

const AnswersForm = ({ fieldKey }: any) => {
  return (
    <Form.List name={[fieldKey, "answers"]}>
      {(answers, { add: addAnswer, remove: removeAnswer }) => (
        <div>
          {answers.map((answer: any) => {
            return (
              <Row key={`answer-${answer.key}`} justify="space-between">
                <Form.Item
                  {...answer}
                  name={[answer.name, "content"]}
                  fieldKey={[answer.fieldKey, "content"]}
                  rules={[
                    {
                      required: true,
                      message: "Answer is required.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...answer}
                  name={[answer.name, "isCorrect"]}
                  fieldKey={[answer.fieldKey, "isCorrect"]}
                  valuePropName="checked"
                  // noStyle
                  initialValue={false}
                >
                  <Checkbox>Is correct?</Checkbox>
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => {
                    removeAnswer(answer.name);
                  }}
                />
              </Row>
            );
          })}
          <Row justify="center">
            <Col span={8}>
              <Button
                type="dashed"
                onClick={() => {
                  addAnswer();
                }}
                block
                disabled={answers.length == 5}
              >
                Add Answer
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Form.List>
  );
};

export default AnswersForm;
