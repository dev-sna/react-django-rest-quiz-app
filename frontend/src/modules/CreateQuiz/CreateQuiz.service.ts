import { camelizeKeys, decamelizeKeys } from "humps";

import apiCaller from "../../utils/apiCaller";
import { Endpoints } from "../../utils/endpoints";

export const createQuiz = (quiz: any) => {
  const deCamelized = decamelizeKeys(quiz);
  return apiCaller({
    method: "POST",
    endpoint: Endpoints.quizzes,
    body: deCamelized,
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};
