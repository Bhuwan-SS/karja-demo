import axiosInstance from "../../utils/axios";

//creating function
export const createRegistration = (body) =>
  axiosInstance.post(`/api/v1/account-application`, body, {
    "Content-Type": "multipart/form-data",
  });
// export const verify = (body) =>
//   axiosInstance.post(`http://192.168.1.172:8082/register`, body, {
//     "Content-Type": "multipart/form-data",
//   });
export const getSpecificAccount = (accountNo) =>
  axiosInstance.get(`/api/v1/customer-app/customer-summary/${accountNo}`);

export const getBranches = () => axiosInstance.get(`/api/v1/branches`);
export const getApplications = () =>
  axiosInstance.get(`/api/v1/account-application`);
export const getCheques = () => axiosInstance.get(`/api/v1/cheque-request`);
export const getStatements = () => axiosInstance.get(`/api/v1/bank-statement`);
export const getAccountSignatures = () =>
  axiosInstance.get(`/api/v1/account-documents`);

export const updateApplication = (body) =>
  axiosInstance.post(`/api/v1/account-documents`, body, {
    "Content-Type": "multipart/form-data",
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

export const verifyChequeRequest = (body) =>
  axiosInstance.post(`/api/v1/cheque-request`, body);

export const verifyStatementRequest = (body) =>
  axiosInstance.post(`/api/v1/bank-statement`, body);
export const verifyFingerprint = (body) =>
  axiosInstance.post(`/api/v1/user-app/verify-fingerprint`, body);
export const verifySignature = (body) =>
  axiosInstance.post(`/api/v1/customer-app/verify-signature`, body);
