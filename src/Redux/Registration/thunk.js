import * as API from "./api";
import * as action from "./action";
import {
  errorFunction,
  successFunction,
  toastErrorFunction,
  toastSuccessFunction,
} from "../../component/Alert";
// import jwt_decode from "jwt-decode";

export const getBranches = () => async (dispatch) => {
  try {
    const { data } = await API.getBranches();
    dispatch(action.getBranchesSuccessAction(data));
  } catch (error) {
    dispatch(action.getBranchesFailAction(error));
    //  toastErrorFunction("Failed to register.");
  }
};
export const getApplications = () => async (dispatch) => {
  try {
    dispatch(action.loadingApplicationsAction());
    const { data } = await API.getApplications();
    dispatch(action.getApplicationsSuccessAction(data));
  } catch (error) {
    dispatch(action.getApplicationsFailAction(error));
    // toastErrorFunction("Failed to register.");
  }
};
export const getCheques = () => async (dispatch) => {
  try {
    const { data } = await API.getCheques();
    dispatch(action.getChequesSuccessAction(data));
  } catch (error) {
    dispatch(action.getChequesFailAction(error));
    // toastErrorFunction("Failed to register.");
  }
};

export const getStatements = () => async (dispatch) => {
  try {
    const { data } = await API.getStatements();
    dispatch(action.getStatementsSuccessAction(data));
  } catch (error) {
    dispatch(action.getStatementsFailAction(error));
    // toastErrorFunction("Failed to register.");
  }
};
export const getAccountSignatures = () => async (dispatch) => {
  try {
    const { data } = await API.getAccountSignatures();
    dispatch(action.getAccountSignaturesSuccessAction(data));
  } catch (error) {
    dispatch(action.getAccountSignaturesFailAction(error));
    // toastErrorFunction("Failed to register.");
  }
};

export const getSpecificAccount = (accountNo) => async (dispatch) => {
  try {
    dispatch(action.loadingSpecificAccount());
    const { data } = await API.getSpecificAccount(accountNo);
    dispatch(action.getSpecificAccountSuccessAction(data));
  } catch (error) {
    dispatch(action.getSpecificAccountFailAction(error));
    // toastErrorFunction("Failed to register.");
  }
};

export const createRegistration =
  ({
    salutation,
    accountCategory,
    firstName,
    middleName,
    lastName,
    email,
    branch,
    mobileNo,
    permanentAddress,
    temporaryAddress,
    dateOfBirthAd,
    identificationType,
    identificationNo,
    issuedDateAd,
    issuedPlace,
    idFrontFile,
    idBackFile,
  }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const body = new FormData();
      body.append("salutation", salutation);
      body.append("accountCategory", accountCategory);
      body.append("firstName", firstName);
      body.append("middleName", middleName);
      body.append("lastName", lastName);
      body.append("email", email);
      body.append("branch", branch);
      body.append("mobileNo", mobileNo);
      body.append("permanentAddress", permanentAddress);
      body.append("temporaryAddress", temporaryAddress);
      body.append("dateOfBirthAd", dateOfBirthAd);
      body.append("identificationType", identificationType);
      body.append("identificationNo", identificationNo);
      body.append("issuedDateAd", issuedDateAd);
      body.append("issuedPlace", issuedPlace);
      body.append("idFrontFile", idFrontFile);
      body.append("idBackFile", idBackFile);
      const { data } = await API.createRegistration(body);
      dispatch(action.createRegistrationSuccessAction(data));
      toastSuccessFunction("Successfully registered. ");
      return true;
    } catch (error) {
      dispatch(action.createRegistrationFailAction(error));
      // toastErrorFunction("Failed to register application.");
      return false;
    }
  };

export const updateApplication = (data, id) => async (dispatch) => {
  const {
    userPhoto,
    accountCategory,
    firstName,
    middleName,
    lastName,
    email,
    mobileNo,
    permanentAddress,
    remarks,
    signatureFss1,
    signatureFss2,
    signatureFss3,
    signatureFss4,
    signatureFss5,
    signatureFss6,
    signatureDynamicFile1,
    signatureDynamicFile2,
    signatureDynamicFile3,
    signatureDynamicFile4,
    signatureDynamicFile5,
    signatureDynamicFile6,
    signatureStaticFile1,
    signatureStaticFile2,
    signatureStaticFile3,
    signatureStaticFile4,
    signatureStaticFile5,
    signatureStaticFile6,
    leftFingerPrintText1,
    leftFingerPrintFile1,
    leftFingerPrintText2,
    leftFingerPrintFile2,
    rightFingerPrintText1,
    rightFingerPrintFile1,
    rightFingerPrintText2,
    rightFingerPrintFile2,
  } = data;
  try {
    dispatch(action.loadingUpdateAction());
    const body = new FormData();
    body.append("accountApplication", id);
    body.append("userPhoto", userPhoto);
    body.append("accountCategory", accountCategory);
    body.append("firstName", firstName);
    body.append("middleName", middleName);
    body.append("lastName", lastName);
    body.append("email", email);
    body.append("mobileNo", mobileNo);
    body.append("permanentAddress", permanentAddress);
    body.append("remarks", remarks);
    body.append("signatureFss1", signatureFss1);
    body.append("signatureFss2", signatureFss2);
    body.append("signatureFss3", signatureFss3);
    body.append("signatureFss4", signatureFss4);
    body.append("signatureFss5", signatureFss5);
    body.append("signatureFss6", signatureFss6);
    body.append("signatureDynamicFile1", signatureDynamicFile1);
    body.append("signatureDynamicFile2", signatureDynamicFile2);
    body.append("signatureDynamicFile3", signatureDynamicFile3);
    body.append("signatureDynamicFile4", signatureDynamicFile4);
    body.append("signatureDynamicFile5", signatureDynamicFile5);
    body.append("signatureDynamicFile6", signatureDynamicFile6);
    body.append("signatureStaticFile1", "");
    body.append("signatureStaticFile2", "");
    body.append("signatureStaticFile3", "");
    body.append("signatureStaticFile4", "");
    body.append("signatureStaticFile5", "");
    body.append("signatureStaticFile6", "");
    body.append("leftFingerPrintText1", leftFingerPrintText1);
    body.append("leftFingerPrintFile1", leftFingerPrintFile1);
    body.append("rightFingerPrintText1", rightFingerPrintText1);
    body.append("rightFingerPrintFile1", rightFingerPrintFile1);
    body.append("leftFingerPrintText2", leftFingerPrintText2);
    body.append("leftFingerPrintFile2", leftFingerPrintFile2);
    body.append("rightFingerPrintText2", rightFingerPrintText2);
    body.append("rightFingerPrintFile2", rightFingerPrintFile2);
    await API.updateApplication(body, id);
    // dispatch(action.updateRegistrationSuccessAction(data));
    toastSuccessFunction("Successfully updated. ");
    dispatch(getApplications());
    return true;
  } catch (error) {
    dispatch(action.updateRegistrationFailAction(error));
    toastErrorFunction("invalid signatures.");
    return false;
  }
};

export const verifyChequeRequest =
  ({
    testDynamicSignatureFile = "",
    testStaticSignatureFile = "",
    chequeLeaves,
    accountApplicationId,
    testDynamicSignatureFss = "",
    testFingerprintText = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingCheque());
      const body = new FormData();
      body.append("testDynamicSignatureFile", testDynamicSignatureFile);
      body.append("testStaticSignatureFile", testStaticSignatureFile);
      body.append("leaves", chequeLeaves);
      body.append("accountApplication", accountApplicationId);
      body.append("testDynamicSignatureFss", testDynamicSignatureFss);
      body.append("testFingerprintText", testFingerprintText);

      const { data } = await API.verifyChequeRequest(body);
      dispatch(action.verifyChequeRequestSuccessAction(data));
      return true;
    } catch (error) {
      dispatch(action.verifyChequeRequestFailAction(error));
      return false;
    }
  };

export const verifyStatementRequest =
  ({ testSignatureText, startDate, endDate, accountApplicationId }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingStatement());
      const body = new FormData();
      body.append("testSignatureText", testSignatureText);
      body.append("startDate", startDate);
      body.append("endDate", endDate);
      body.append("accountApplicationId", accountApplicationId);

      const { data } = await API.verifyStatementRequest(body);
      dispatch(action.verifyStatementRequestSuccessAction(data));
      return true;
      // dispatch(getApplications());
    } catch (error) {
      dispatch(action.verifyStatementRequestFailAction(error));
      return false;
    }
  };

export const verifyFingerprint =
  ({ registrationNo, testFingerPrintText }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingStatement());
      const body = { registrationNo, testFingerPrintText };

      const { data } = await API.verifyFingerprint(body);
      dispatch(action.verifyFingerprintSuccessAction(data));
      successFunction("Successfully verified");
      return true;
    } catch (error) {
      errorFunction("Fingerprint did not matched!");
      dispatch(action.verifyFingerprintFailAction(error));
      return false;
    }
  };
export const verifySignature =
  ({ accountNo, testFingerPrintText }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingStatement());
      const body = { accountNo, testFingerPrintText };

      const { data } = await API.verifySignature(body);
      dispatch(action.verifySignatureSuccessAction(data));
      return true;
    } catch (error) {
      dispatch(action.verifySignatureFailAction(error));
      return false;
    }
  };
