import apiCaller from "../../utils/apiCaller";
import { Endpoints } from "../../utils/endpoints";
import { camelizeKeys, decamelizeKeys } from "humps";

export const registerUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const body = decamelizeKeys({
    firstName,
    lastName,
    email,
    password,
  });
  return apiCaller({
    endpoint: Endpoints.register,
    body,
    method: "POST",
  }).then((response: any) => {
    const camelized = camelizeKeys(response.data.data);
    return camelized;
  });
};
