import { camelizeKeys } from "humps";

import apiCaller from "../../utils/apiCaller";
import { Endpoints } from "../../utils/endpoints";

export const getUserQuizzes = () => {
  return apiCaller({
    endpoint: Endpoints.quizzes,
    method: "GET",
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};

export const publishQuiz = (id: number) => {
  return apiCaller({
    endpoint: `${Endpoints.quizzes}publish_quiz/`,
    method: "POST",
    body: {
      quiz: id,
    },
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};

export const deleteQuiz = (id: number) => {
  return apiCaller({
    endpoint: `${Endpoints.quizzes}${id}`,
    method: "DELETE",
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};
