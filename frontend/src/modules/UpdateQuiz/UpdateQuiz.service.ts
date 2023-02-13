import { camelizeKeys, decamelizeKeys } from "humps";

import apiCaller from "../../utils/apiCaller";
import { Endpoints } from "../../utils/endpoints";

export const getQuiz = (id: string) => {
  return apiCaller({
    method: "GET",
    endpoint: `${Endpoints.quizzes}${id}`,
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};

export const updateQuiz = (id: string, quiz: any) => {
  const deCamelized = decamelizeKeys(quiz);
  return apiCaller({
    method: "PUT",
    endpoint: `${Endpoints.quizzes}${id}/`,
    body: deCamelized,
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};
