import { userConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: userConstants.LOADING_USER,
});


export const createUserSuccessAction = (data) => ({
  type: userConstants.CREATE_USER_SUCCESS,
  payload: data,
});
export const createUserFailAction = (error) => ({
  type: userConstants.CREATE_USER_FAIL,
  payload: error,
});

export const getUsersSuccessAction = (data) => ({
  type: userConstants.GET_USERS_SUCCESS,
  payload: data,
});
export const getUsersFailAction = (error) => ({
  type: userConstants.GET_USERS_FAIL,
  payload: error,
});