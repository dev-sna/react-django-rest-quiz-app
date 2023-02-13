import { message } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import isEmpty from "lodash.isempty";
import { logoutUser, updateUserToken } from "../modules/providers/AuthProvider";

import { AUTH_EXPIRED_TEXT, BASE_URL } from "./constants";
import { Endpoints } from "./endpoints";

interface ApiCallerParams {
  endpoint: string;
  method?: string;
  body?: any;
  params?: any;
}

function refreshToken(headers: any, refreshToken: string) {
  const URL = `${BASE_URL}${Endpoints.refresh_token}`;
  return axios({
    headers,
    url: URL,
    method: "POST",
    data: {
      refresh: refreshToken,
    },
  }).then((response) => {
    return response.data.access;
  });
}

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

const getExtraHeaders = (token: string, headers: any) => {
  return {
    ...headers,
    Authorization: `JWT ${token}`,
  };
};

const apiCaller = async ({
  endpoint,
  method = "GET",
  body,
  params = {},
}: ApiCallerParams) => {
  const URL = `${BASE_URL}${endpoint}`;
  let headers = getHeaders();

  const authData: any = localStorage.getItem("user");
  if (authData != "undefined" && authData != null) {
    const parsed_auth_data = JSON.parse(authData);
    if (parsed_auth_data) {
      const decodedToken: any = jwt_decode(parsed_auth_data.token);
      const currentTimeStamp: number = Math.round(Date.now() / 1000);
      if (decodedToken.exp < currentTimeStamp) {
        logoutUser();
        message.error(AUTH_EXPIRED_TEXT);
      }
      if (decodedToken.exp - currentTimeStamp <= 1) {
        const newToken = await refreshToken(
          headers,
          parsed_auth_data.refresh
        ).then((response) => response);
        const newUserData = {
          ...parsed_auth_data,
          token: newToken,
        };
        updateUserToken(newUserData);
      } else headers = getExtraHeaders(parsed_auth_data.token, headers);
    }
  }

  return axios({
    method,
    url: URL,
    data: body,
    params: params,
    headers,
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export default apiCaller;
