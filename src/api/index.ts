import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { message } from "antd";

// 返回res.data的interface
export interface IResponse<T = any> {
  code: number | string;
  data: T;
  message: string;
  success: boolean;
}

// 创建 axios 实例
const axiosInstance = axios.create({
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
    const { data, headers, config } = response;

    // 处理 token 存储
    if (headers.authorization) {
      localStorage.setItem("app_token", headers.authorization);
    } else if (data && (data as any).token) {
      localStorage.setItem("app_token", (data as any).token);
    }

    // 对于 blob 类型（文件下载），返回原始响应
    if (config.responseType === 'blob') {
      return response as any;
    }

    // 处理业务逻辑
    if (data.code === 200) {
      if (!localStorage.getItem("app_token") && config.url !== '/api/getDict') {
        console.log(1111)
        message.error(data.message);
      }
      // 返回 data，类型为 IResponse
      return data as any;
    } else if (data.code === 401) {
      localStorage.removeItem("app_token");
      message.error(data.message);
      return Promise.reject(data);
    } else {
      message.error(data.message);
      return Promise.reject(data);
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      const errorData = response.data || { message: "请求失败" };

      message.error(errorData.message || "网络连接异常,请稍后再试!");
      return Promise.reject(errorData);
    } else {
      message.error("网络连接异常,请稍后再试!");
      return Promise.reject(error);
    }
  }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

// 扩展 axios 实例类型，使其返回 IResponse<T> 而不是 AxiosResponse
interface CustomAxiosInstance {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponse<T>>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponse<T>>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<IResponse<T>>;
  [key: string]: any; // 允许其他属性和方法
}

// 类型断言，将 axiosInstance 转换为 CustomAxiosInstance
export default axiosInstance as CustomAxiosInstance;
