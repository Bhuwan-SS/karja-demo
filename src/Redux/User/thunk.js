import * as API from "./api";
import * as action from "./action";
import {
  toastSuccessFunction,
  toastErrorFunction,
} from "../../component/Alert";

export const createUser =
  ({
    firstName,
    middleName,
    lastName,
    email,
    userName,
    password,
    mobileNo,
    permanentAddress,
    temporaryAddress,
    dateOfBirthAd,
    signatureFss1,
    signatureFss2,
    signatureDynamicFile1,
    signatureDynamicFile2,
    signatureStaticFile1,
    signatureStaticFile2,
    leftFingerPrintText1,
    leftFingerPrintFile1,
    rightFingerPrintText1,
    rightFingerPrintFile1,
    leftFingerPrintText2,
    leftFingerPrintFile2,
    rightFingerPrintText2,
    rightFingerPrintFile2,
  }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const body = JSON.stringify({
        firstName,
        middleName,
        lastName,
        email,
        mobileNo,
        userName,
        password,
        permanentAddress,
        temporaryAddress,
        dateOfBirthAd,
        signatureFss1,
        signatureFss2,
        signatureDynamicFile1,
        signatureDynamicFile2,
        signatureStaticFile1,
        signatureStaticFile2,
        leftFingerPrintText1,
        leftFingerPrintFile1,
        rightFingerPrintText1,
        rightFingerPrintFile1,
        leftFingerPrintText2,
        leftFingerPrintFile2,
        rightFingerPrintText2,
        rightFingerPrintFile2,
      });
      // const body = new FormData();
      // body.append("firstName", firstName);
      // body.append("middleName", middleName);
      // body.append("lastName", lastName);
      // body.append("email", email);
      // body.append("mobileNo", mobileNo);
      // body.append("userName", userName);
      // body.append("permanentAddress", permanentAddress);
      // body.append("temporaryAddress", temporaryAddress);
      // body.append("dateOfBirthAd", dateOfBirthAd);
      // body.append("signatureText1", signatureText1);
      // // body.append("signatureFile1", signatureFile1);
      // body.append("signatureText2", signatureText2);
      // // body.append("signatureFile2", signatureFile2);
      // body.append("leftFingerPrintText1", leftFingerPrintText1);
      // // body.append("leftFingerPrintFile1", leftFingerPrintFile1);
      // body.append("rightFingerPrintText1", rightFingerPrintText1);
      // // body.append("rightFingerPrintFile1", rightFingerPrintFile1);
      // body.append("leftFingerPrintText2", leftFingerPrintText2);
      // // body.append("leftFingerPrintFile2", leftFingerPrintFile2);
      // body.append("rightFingerPrintText2", rightFingerPrintText2);
      // // body.append("rightFingerPrintFile2", rightFingerPrintFile2);
      const { data } = await API.createUser(body);
      dispatch(action.createUserSuccessAction(data));
      toastSuccessFunction("Successfully registered. ");
      return true;
    } catch (error) {
      dispatch(action.createUserFailAction(error));
      toastErrorFunction("Failed to create User.");
      return false;
    }
  };

// export const updateUser = (data, id) => async (dispatch) => {
//   const {
//     accountCategory,
//     firstName,
//     middleName,
//     lastName,
//     email,
//     mobileNo,
//     permanentAddress,
//     remarks,
//     signatureText1,
//     signatureText2,
//     signatureFile1,
//     signatureFile2,
//     leftFingerPrintText1,
//     leftFingerPrintFile1,
//     leftFingerPrintText2,
//     leftFingerPrintFile2,
//     rightFingerPrintText1,
//     rightFingerPrintFile1,
//     rightFingerPrintText2,
//     rightFingerPrintFile2,
//   } = data;
//   try {
//     // dispatch(action.loadingUpdateAction());
//     const body = new FormData();
//     body.append("accountApplication", id);
//     body.append("accountCategory", accountCategory);
//     body.append("firstName", firstName);
//     body.append("middleName", middleName);
//     body.append("lastName", lastName);
//     body.append("email", email);
//     body.append("mobileNo", mobileNo);
//     body.append("permanentAddress", permanentAddress);
//     body.append("remarks", remarks);
//     body.append("signatureText1", signatureText1);
//     body.append("signatureFile1", signatureFile1);
//     body.append("signatureText2", signatureText2);
//     body.append("signatureFile2", signatureFile2);
//     // body.append("leftFingerPrintText1", leftFingerPrintText1);
//     body.append("leftFingerPrintFile1", leftFingerPrintFile1);
//     // body.append("rightFingerPrintText1", rightFingerPrintText1);
//     body.append("rightFingerPrintFile1", rightFingerPrintFile1);
//     // body.append("leftFingerPrintText2", leftFingerPrintText2);
//     body.append("leftFingerPrintFile2", leftFingerPrintFile2);
//     // body.append("rightFingerPrintText2", rightFingerPrintText2);
//     body.append("rightFingerPrintFile2", rightFingerPrintFile2);
//     const { data } = await API.updateApplication(body, id);
//     // dispatch(action.updateRegistrationSuccessAction(data));
//     successFunction("Successfully updated. ");
//     dispatch(getApplications());
//   } catch (error) {
//     dispatch(action.updateRegistrationFailAction(error));
//     toastErrorFunction("Failed to update.");
//   }
// };
export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await API.getUsers();
    dispatch(action.getUsersSuccessAction(data));
  } catch (error) {
    dispatch(action.getUsersFailAction(error));
    // toastErrorFunction("Failed to register.");
  }
};
