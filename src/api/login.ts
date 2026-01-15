import axiosInstance from ".";

export const login = (data: any) => {
  return axiosInstance.post("/api/login", data);
};

export const register = (data: any) => {
  return axiosInstance.post("/api/register", data);
};

export const getUserInfo = () => {
  return axiosInstance.get("/api/getUserInfo");
};
