import axiosInstance from ".";

export const queryClass = (params: any) => {
  return axiosInstance.get("/api/class/queryClass", { params });
};

export const getTeacherList = () => {
  return axiosInstance.get("/api/class/getTeacher");
};

export const addClass = (data: any) => {
  return axiosInstance.post("/api/class/addClass", data);
};
