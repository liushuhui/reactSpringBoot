import axiosInstance from ".";

export const getDict = (params: any = {}) => {
  return axiosInstance.get("/api/getDict", { params });
};