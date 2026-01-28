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
export const addStudentToClass = (data: any) => {
  return axiosInstance.post("/api/class/addStudentToClass", data);
};

export const queryClassStudent = (params: any) => {
  return axiosInstance.get("/api/class/queryClassStudent", { params });
};

export const queryStudent = (params: any) => {
  return axiosInstance.get("/api/student/queryList", { params });
};

export const deleteClassStudent = (params: any) => {
  return axiosInstance.delete("/api/class/deleteClassStudent", { params });
}