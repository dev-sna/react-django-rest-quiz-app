import { Typography } from "antd";

const { Title } = Typography;

const NoQuizzes = () => {
  return (
    <Title style={{ textAlign: "center" }} level={4}>
      You have no active Quizzes.
    </Title>
  );
};

export default NoQuizzes;
