import { camelizeKeys, decamelizeKeys } from "humps";

import apiCaller from "../../utils/apiCaller";
import { Endpoints } from "../../utils/endpoints";
import { getSubmitQuizPayload } from "../../utils/helpers";

export const getQuizByUUID = (uuid: string) => {
  return apiCaller({
    method: "GET",
    endpoint: Endpoints.take_quiz,
    params: {
      quiz_uuid: uuid,
    },
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};

export const submitQuiz = (quiz_id: number, selectedAnswers: any) => {
  const submitQuizPayload = decamelizeKeys(
    getSubmitQuizPayload(quiz_id, selectedAnswers)
  );
  return apiCaller({
    method: "POST",
    endpoint: Endpoints.take_quiz,
    body: submitQuizPayload,
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};
