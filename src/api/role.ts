import axiosInstance from ".";

export const addRole = (data: any = {}) => {
    return axiosInstance.post("/api/role/addRole", data);
};

export const updateRole = (data: any = {}) => {
    return axiosInstance.post("/api/role/updateRole", data);
};

export const getRoles = (params: any = {}) => {
    return axiosInstance.get("/api/role/queryRoleList", { params });
};