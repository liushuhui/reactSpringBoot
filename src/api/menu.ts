import axiosInstance from ".";

export const getMenu = () => {
  return axiosInstance.get("/api/menu/getMenu");
};
export const getMenuTree = () => {
  return axiosInstance.get("/api/menu/getMenuTree");
};

export const addMenu = (data: any) => {
  return axiosInstance.post("/api/menu/addMenu", data);
};
export const updateMenu = (data: any) => {
  return axiosInstance.post("/api/menu/updateMenu", data);
};

export const getMenuById = (params: any) => {
  return axiosInstance.get(`/api/menu/getMenuById`, { params });
};
