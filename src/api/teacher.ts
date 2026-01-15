import axiosInstance from ".";

export const getTeachers = (params?: any) => {
  return axiosInstance.get("/api/teacher/queryTeachers", { params });
};

export const deleteTeacherByIds = (data: any) => {
  return axiosInstance.post(`/api/teacher/deleteTeacherByIds`, data);
};

export const updateTeacher = (data: any) => {
  return axiosInstance.post(`/api/teacher/updateTeacher`, data);
};
export const addTeacher = (data: any) => {
  return axiosInstance.post(`/api/teacher/addTeacher`, data);
};