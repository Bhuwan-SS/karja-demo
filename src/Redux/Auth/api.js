import axiosInstance from "../../utils/axios";

//for login
export const login = (body) =>
  axiosInstance.post(`api/v1/login-password`, body);

export const updateKYC = (id, body) =>
  axiosInstance.patch(`api/v1/customer-app/update-customer/${id}`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const enroll = (body) =>
  axiosInstance.post(`api/v1/user-app/save-user`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const enrollAccountForm = (body) =>
  axiosInstance.post(`/api/v1/customer-app/save`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const enrollVideoKYC = (body) =>
  axiosInstance.post(`api/v1/customer-app/save-customer`, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
//for logout
export const logout = (body) =>
  axiosInstance.post(`api/v1/user-app/logout`, body);

export const loginThumb = (body) =>
  axiosInstance.post(`/api/v1/login-fingerprint`, body);

export const loginSignature = (body) =>
  axiosInstance.post(`/api/v1/login-signature`, body);

export const getApplications = () =>
  axiosInstance.get(`/api/v1/customer-app/customers?limit=0`);
