import axiosInstance from "../../utils/axios";

//creating function
export const createUser = (body) =>
  axiosInstance.post(`/api/v1/user`, body, {
    "Content-Type": "multipart/form-data",
  });

  export const getUsers = () => axiosInstance.get(`/api/v1/user`);
