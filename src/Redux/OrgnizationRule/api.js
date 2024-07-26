import axiosInstance from "../../utils/axios";

//for login
export const getOrganizationRule = () =>
  axiosInstance.post(`api/v1/organization-rule`);
