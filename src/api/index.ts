import axios, { AxiosInstance, AxiosResponse } from "axios";

import { message } from "antd";

// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

let axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:5173",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Token: localStorage.getItem("app_token"),
  },
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      localStorage.setItem("app_token", response.headers.authorization);
    } else {
      if (response.data && response.data.token) {
        localStorage.setItem("app_token", response.data.token);
      }
    }

    if (response.status === 200) {
      if (!localStorage.getItem("app_token")) {
        message.error(response.data.message);
        window.location.href = "/login";
      }
      return response?.data;
    } else {
      message.error(response.status);
      return response;
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      message.error(response.status);
      return Promise.reject(response.data);
    } else {
      message.error("网络连接异常,请稍后再试!");
    }
  }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("app_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;