import axios from "axios";
import { store } from "../Redux/store";
import { authConstants } from "../Redux/Auth/constants";
import { toast } from "react-toastify";
//creating axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//interceptor
//request handling
axiosInstance.interceptors.request.use(
  (config) => {
    // if (!window.navigator.onLine) {
    //   return Promise.reject("No Internet");
    // }
    // if (window.navigator.onLine) {
    config.headers["Authorization"] = localStorage.getItem("accessToken")
      ? `Bearer ${localStorage.getItem("accessToken")}`
      : null;
    return config;
    // }
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response handling
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    //refresh token
    const originalRequest = error.config;
    //when refresh token is also not valid
    if (
      error.response.status === 401 &&
      originalRequest.url === `api/v1/user-app/login/refresh`
    ) {
      store.dispatch({ type: authConstants.AUTH_ERROR });
      // return Promise.reject(error.response?.data.code);
      return toast.error(`Refresh Token Expired. Please Login.`, {
        autoClose: 1200,
      });
    }
    //accessing new access token from refresh token
    if (
      error.response?.data.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      //call for refresh token
      originalRequest._retry = true;
      try {
        const body = JSON.stringify({
          refresh: localStorage.getItem("refreshToken"),
        });
        localStorage.removeItem("accessToken");
        const response = await axiosInstance.post(
          `api/v1/user-app/login/refresh`,
          body
        );
        if (response.status === 200) {
          localStorage.setItem("accessToken", response?.data.access);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response?.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        store.dispatch({
          type: authConstants.AUTH_ERROR,
        });

        // return toast.error(`${error.response.data.error}`);
        // return Promise.reject(error.response?.data.error);
      }
      // return store.dispatch({ type: AUTH_ERROR });
    }
    //no Internet
    if (error === "No Internet") {
      toast.error(`No Internet Connection !!!`);
      // return Promise.reject(`No Internet`);
    }
    //server down
    if (error.message === "Network Error") {
      toast.error("Internal Server Error. Contact IT manager !!!", {
        autoClose: 1200,
      });
      // return Promise.reject(`Internal Server Error. Contact IT manager !!!`);
    }
    if (error.response?.status === 500) {
      toast.error("Internal Server Error. Contact IT manager !!!", {
        autoClose: 1200,
      });
      // return Promise.reject(`Internal Server Error. Contact IT manager !!!`);
    }
    if (error.response?.status === 404) {
      toast.error("Page Not Found !!!!!", { autoClose: 1200 });
    }
    //unauthorized user
    if (
      error.response?.status === 401 ||
      error.message === "Invalid token specified"
    ) {
      store.dispatch({ type: authConstants.AUTH_ERROR });
      // toast.error("Unauthorized User", { autoClose: 1200 });

      return Promise.reject(error.response.data.detail);
    }
    //error between 400
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (expectedError) {
      if (error.response.data.detail) {
        return Promise.reject(`${error.response.data.detail}`);
      } else {
        return Promise.reject(`${error.response.statusText}`);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
