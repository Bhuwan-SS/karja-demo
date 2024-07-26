import { userConstants } from "./constants";
const initialState = {
  users: [],
  user: null,
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading_user: false,
  imgGallery: [],
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOADING_USER:
      return { ...state, loading_user: true };

    case userConstants.CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading_user: false,
      };
    case userConstants.CREATE_USER_FAIL:
      return { ...state, loading_user: false };

    case userConstants.FINGERPRINT_ADDED:
      return { ...state, imgGallery: [...state.imgGallery, action.payload] };
    case userConstants.FINGERPRINT_UPDATED:
      return { ...state, imgGallery: action.payload };
    case userConstants.GET_USERS_SUCCESS:
      return { ...state, users: action.payload };
    case userConstants.GET_USERS_FAIL:
      return { ...state, users: [] };
      case userConstants.CLEAR_IMAGE_GALLERY:
        return { ...state, imgGallery: [] };
    default:
      return state;
  }
};
export default userReducer;
