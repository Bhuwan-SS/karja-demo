import * as API from "./api";
import * as action from "./action";
import {
  toastSuccessFunction,
  toastErrorFunction,
} from "../../component/Alert";
//login
export const login = (userName, password) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = new FormData();
    body.append("userName", userName);
    body.append("password", password);

    const { data } = await API.login(body);
    //for storing the states when login success on the basis of which we can change the route of page.
    // toastSuccessFunction(`Welcome ${data.userName}`);
    dispatch(action.loginSuccessAction(data));
    return true;
  } catch (error) {
    toastErrorFunction("Credentials do not matched.Please try again");
    dispatch(action.loginFailAction(error));
    return false;
  }
};
export const getApplications = () => async (dispatch) => {
  try {
    dispatch(action.loadingApplicationsAction());
    const { data } = await API.getApplications();
    dispatch(action.getApplicationsSuccess(data));
  } catch (error) {
    dispatch(action.getApplicationsFail(error));
  }
};
export const enroll = (enrollData) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = new FormData();
    body.append("fullName", enrollData?.fullName);
    body.append("fatherName", enrollData?.fatherName);
    body.append("motherName", enrollData?.motherName);
    body.append("contact", enrollData?.contact);
    body.append("provinceId", enrollData?.provinceId);
    body.append("districtId", enrollData?.districtId);
    body.append("localLevelId", enrollData?.localLevelId);
    body.append("wardNoId", enrollData?.wardNoId);
    body.append("tole", enrollData?.tole);
    body.append("photo", enrollData?.photo);
    body.append("leftFingerPrintText", enrollData?.leftFingerprintText);
    body.append("rightFingerPrintText", enrollData?.rightFingerprintText);
    body.append("staticSignature1", enrollData?.staticSignature1);
    body.append("staticSignature2", enrollData?.staticSignature2);
    // body.append("fssSignature1", enrollData?.fssSignature1);
    // body.append("fssSignature2", enrollData?.fssSignature2);
    body.append("documentType", enrollData?.documentType);
    body.append("documentFront", enrollData?.documentFront);
    body.append("documentBack", enrollData?.documentBack);
    const { data } = await API.enroll(body);
    dispatch(action.enrollSuccessAction(data));
    return true;
  } catch (error) {
    toastErrorFunction("Fail to open account.");
    dispatch(action.enrollFailAction());
    return false;
  }
};
export const enrollAccountForm = (enrollData) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = new FormData();
    body.append("bankCode", enrollData?.bankCode);
    body.append("name", enrollData?.name);
    body.append("documentId", enrollData?.documentId);
    body.append("dateOfBirth", enrollData?.dateOfBirth);
    body.append("fatherName", enrollData?.fatherName);
    body.append("motherName", enrollData?.motherName);
    body.append("contact", enrollData?.contact);
    body.append("provinceId", enrollData?.provinceId);
    body.append("districtId", enrollData?.districtId);
    body.append("localLevelId", enrollData?.localLevelId);
    body.append("wardNoId", enrollData?.wardNoId);
    body.append("tole", enrollData?.tole);
    body.append("photo", enrollData?.photo);
    body.append("leftFingerPrintText", enrollData?.leftFingerPrintText);
    body.append("rightFingerPrintText", enrollData?.rightFingerPrintText);
    body.append("staticSignature1", enrollData?.staticSignature1);
    body.append("staticSignature2", enrollData?.staticSignature2);
    const { data } = await API.enrollAccountForm(body);
    dispatch(action.enrollSuccessAction(data));
    return true;
  } catch (error) {
    toastErrorFunction("Fail to open account.");
    dispatch(action.enrollFailAction());
    return false;
  }
};
export const updateKYC = (enrollData) => async (dispatch) => {
  const { id } = enrollData;
  try {
    const body = new FormData();
    body.append("name", enrollData?.name);
    body.append("address", enrollData?.address);
    body.append("phoneNo", enrollData?.phoneNo);
    body.append("remarks", "updated");
    body.append("deviceId", enrollData?.deviceId);
    if (enrollData?.photo !== "") {
      body.append("photo", enrollData?.photo);
    }
    if (enrollData?.leftFingerPrintText !== "") {
      body.append("leftFingerPrintText", enrollData?.leftFingerPrintText);
    }
    if (enrollData?.rightFingerPrintText !== "") {
      body.append("rightFingerPrintText", enrollData?.rightFingerPrintText);
    }
    if (enrollData?.staticSignature1 !== "") {
      body.append("staticSignature1", enrollData?.staticSignature1);
    }
    if (enrollData?.staticSignature2 !== "") {
      body.append("staticSignature2", enrollData?.staticSignature2);
    }
    if (enrollData?.staticSignature3 !== "") {
      body.append("staticSignature3", enrollData?.staticSignature3);
    }
    if (enrollData?.staticSignature4 !== "") {
      body.append("staticSignature4", enrollData?.staticSignature4);
    }
    if (enrollData?.fssSignature1 !== "") {
      body.append("fssSignature1", enrollData?.fssSignature1);
    }
    if (enrollData?.fssSignature2 !== "") {
      body.append("fssSignature2", enrollData?.fssSignature2);
    }
    if (enrollData?.fssSignature3 !== "") {
      body.append("fssSignature3", enrollData?.fssSignature3);
    }
    if (enrollData?.fssSignature4 !== "") {
      body.append("fssSignature4", enrollData?.fssSignature4);
    }
    const { data } = await API.updateKYC(id, body);
    return true;
  } catch (error) {
    toastErrorFunction(error.response.data.message);
    return false;
  }
};

export const enrollVideoKYC = (enrollData) => async (dispatch) => {
  try {
    const body = new FormData();
    body.append("name", enrollData?.name);
    body.append("address", enrollData?.address);
    body.append("phoneNo", enrollData?.phoneNo);
    body.append("deviceId", enrollData?.deviceId);
    body.append("photo", enrollData?.photo);
    body.append("leftFingerPrintText", enrollData?.leftFingerPrintText);
    body.append("rightFingerPrintText", enrollData?.rightFingerPrintText);
    const { data } = await API.enrollVideoKYC(body);
    return true;
  } catch (error) {
    toastErrorFunction(error.response.data.message);
    return false;
  }
};
//logout function
export const logout = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    dispatch(action.logoutSuccessAction());
    toastSuccessFunction(`You have been successfully logged out.`);
    return true;
  } catch (error) {
    dispatch(action.logoutFailAction(error));
    toastErrorFunction(error);
    return false;
  }
};
export const loginThumb = (img, userName) => async (dispatch) => {
  try {
    dispatch(action.loadingThumbAction());
    const body = new FormData();
    body.append("testFingerPrintText", img);
    body.append("userName", userName);

    const { data } = await API.loginThumb(body);
    toastSuccessFunction(`Welcome ${data.userName}`);
    dispatch(action.loginFingerSuccessAction({ data }));
    return true;
    // dispatch(getApplications());
  } catch (error) {
    toastErrorFunction("Invalid Fingerprint. Please try again.");
    dispatch(action.loginFingerFailAction(error));
    return false;
  }
};
export const loginSignature = (img, userName) => async (dispatch) => {
  try {
    dispatch(action.loadingSignatureAction());
    const body = new FormData();
    body.append("testSignatureText", img);
    body.append("userName", userName);

    const { data } = await API.loginSignature(body);
    toastSuccessFunction(`Welcome ${data.userName}`);
    dispatch(action.loginSuccessAction({ data }));
    return true;
    // dispatch(getApplications());
  } catch (error) {
    toastErrorFunction("Invalid Signature. Please try again.");
    dispatch(action.loginFailAction(error));
    return false;
  }
};
