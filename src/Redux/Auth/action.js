import { authConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: authConstants.LOADING_AUTH,
});
export const enrollSuccessAction = (data) => ({
  type: authConstants.ENROLL_SUCCESS,
  payload: data,
});
export const enrollFailAction = () => ({
  type: authConstants.LOADING_COMPLETE,
});
export const loadingThumbAction = () => ({
  type: authConstants.LOADING_THUMB,
});
export const loadingSignatureAction = () => ({
  type: authConstants.LOADING_SIGNATURE,
});
export const loadingApplicationsAction = () => ({
  type: authConstants.LOADING_APPLICATIONS,
});
export const loadingResetAction = () => ({
  type: authConstants.LOADING_RESET,
});
export const LoadingResetPasswordAction = () => ({
  type: authConstants.LOADING_RESET_PASSWORD,
});

export const loginSuccessAction = (data) => ({
  type: authConstants.LOGIN_SUCCESS,
  payload: data,
});
export const loginFailAction = (error) => ({
  type: authConstants.LOGIN_FAIL,
  payload: error,
});

export const loginFingerSuccessAction = (data) => ({
  type: authConstants.LOGIN_FINGERPRINT_SUCCESS,
  payload: data,
});
export const loginFingerFailAction = (error) => ({
  type: authConstants.LOGIN_FINGERPRINT_FAIL,
  payload: error,
});
export const logoutSuccessAction = () => ({
  type: authConstants.LOGOUT_SUCCESS,
});
export const logoutFailAction = (error) => ({
  type: authConstants.LOGOUT_FAIL,
  payload: error,
});
export const resetSuccessAction = (data) => ({
  type: authConstants.RESET_SUCCESS,
  payload: data,
});
export const resetFailAction = (error) => ({
  type: authConstants.RESET_FAIL,
  payload: error,
});
export const confirmSuccessAction = () => ({
  type: authConstants.PASSWORD_CONFIRM_SUCCESS,
});
export const confirmFailAction = (error) => ({
  type: authConstants.PASSWORD_CONFIRM_FAIL,
  payload: error,
});
export const changePasswordSuccessAction = (response) => ({
  type: authConstants.PASSWORD_CHANGE_SUCCESS,
  payload: response,
});

export const changePasswordFailAction = (error) => ({
  type: authConstants.PASSWORD_CHANGE_FAIL,
  payload: error,
});
export const getApplicationsSuccess = (response) => ({
  type: authConstants.GET_APPLICATIONS_SUCCESS,
  payload: response,
});

export const getApplicationsFail = () => ({
  type: authConstants.GET_APPLICATIONS_FAIL,
});
