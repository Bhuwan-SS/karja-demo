import { authConstants } from "./constants";
import storage from "redux-persist/lib/storage";
const initialState = {
  isAuthenticated: false,
  loading: false,
  loading_thumb: false,
  loading_signature: false,
  userName: "",
  userId: "",
  applications: [],
  account:null,
  loadingApplications: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOADING_AUTH:
      return {
        ...state,
        loading: true,
      };
    case authConstants.LOADING_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case authConstants.ENROLL_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
      };
    case authConstants.LOADING_APPLICATIONS:
      return {
        ...state,
        loadingApplications: true,
      };
    case authConstants.LOADING_THUMB:
      return {
        ...state,
        loading_thumb: true,
      };
    case authConstants.LOADING_SIGNATURE:
      return {
        ...state,
        loading_signature: true,
      };
    case authConstants.GET_APPLICATIONS_SUCCESS:
      return {
        ...state,
        applications: action.payload.content,
        loadingApplications: false,
      };
    case authConstants.GET_APPLICATIONS_FAIL:
      return {
        ...state,
        loadingApplications: false,
      };
    case authConstants.LOGIN_SUCCESS:
      storage.removeItem("persist:root");
      return {
        ...state,
        userName: action.payload.userName,
        userId: action.payload.userId,
        loading: false,
        isAuthenticated: true,
        loading_signature: false,
        loading_thumb: false,
      };
    case authConstants.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading_signature: false,
        loading_thumb: false,
        loading: false,
      };
    case authConstants.LOGIN_FINGERPRINT_SUCCESS:
      storage.removeItem("persist:root");
      return {
        ...state,
        isAuthenticated: true,
        userName: action.payload.userName,
        userId: action.payload.userId,
        loading: false,
        loading_signature: false,
        loading_thumb: false,
      };
    case authConstants.LOGIN_FINGERPRINT_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading_signature: false,
        loading_thumb: false,
        loading: false,
      };
    case authConstants.LOGOUT_SUCCESS:
      storage.removeItem("persist:root");
      return {
        ...state,
        isAuthenticated: false,
        userName: "",
        loading_signature: false,
        loading_thumb: false,
        loading: false,
      };
    case authConstants.LOGOUT_FAIL:
      return {
        ...state,
        loading_signature: false,
        loading_thumb: false,
        loading: false,
      };

    case authConstants.USERNAME_ADDED:
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};
export default authReducer;
