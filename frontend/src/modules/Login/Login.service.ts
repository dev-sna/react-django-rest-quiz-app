import { camelizeKeys } from "humps";

import apiCaller from "../../utils/apiCaller";
import { Endpoints } from "../../utils/endpoints";

export const loginUser = (email: string, password: string) => {
  const body = {
    email,
    password,
  };
  return apiCaller({
    endpoint: Endpoints.login,
    method: "POST",
    body,
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};
