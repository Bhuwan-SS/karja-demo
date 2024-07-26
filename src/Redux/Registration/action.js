import { registrationConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: registrationConstants.LOADING_REGISTRATION,
});
export const loadingCheque = () => ({
  type: registrationConstants.LOADING_CHEQUE,
});
export const loadingStatement = () => ({
  type: registrationConstants.LOADING_STATEMENT,
});

export const loadingVerifyFingerprint = () => ({
  type: registrationConstants.LOADING_VERIFY_FINGERPRINT,
});
export const loadingVerifySignature = () => ({
  type: registrationConstants.LOADING_VERIFY_SIGNATURE,
});
export const loadingUpdateAction = () => ({
  type: registrationConstants.LOADING_UPDATE,
});
export const loadingVerifyAction = () => ({
  type: registrationConstants.LOADING_VERIFY,
});
export const loadingApplicationsAction = () => ({
  type: registrationConstants.LOADING_APPLICATIONS,
});
export const loadingParticularAction = () => ({
  type: registrationConstants.LOADING_PARTICULAR,
});

export const loadingSpecificAccount = () => ({
  type: registrationConstants.LOADING_SPECIFIC_ACCOUNT,
});

export const verifyFingerprintSuccessAction = (data) => ({
  type: registrationConstants.VERIFY_FINGERPRINT_SUCCESS,
  payload: data,
});
export const verifyFingerprintFailAction = () => ({
  type: registrationConstants.VERIFY_FINGERPRINT_FAIL,
});

export const verifySignatureSuccessAction = (data) => ({
  type: registrationConstants.VERIFY_SIGNATURE_SUCCESS,
  payload: data,
});
export const verifySignatureFailAction = () => ({
  type: registrationConstants.VERIFY_SIGNATURE_FAIL,
});

export const getApplicationsSuccessAction = (data) => ({
  type: registrationConstants.GET_APPLICATIONS_SUCCESS,
  payload: data,
});
export const getApplicationsFailAction = (error) => ({
  type: registrationConstants.GET_APPLICATIONS_FAIL,
  payload: error,
});
export const createRegistrationSuccessAction = (data) => ({
  type: registrationConstants.REGISTRATION_SUCCESS,
  payload: data,
});
export const createRegistrationFailAction = (error) => ({
  type: registrationConstants.REGISTRATION_FAIL,
  payload: error,
});

export const updateRegistrationSuccessAction = (data) => ({
  type: registrationConstants.REGISTRATION_UPDATE_SUCCESS,
  payload: data,
});
export const updateThumbFailAction = (error) => ({
  type: registrationConstants.REGISTRATION_UPDATE_FAIL,
  payload: error,
});
export const updateThumbSuccessAction = (data) => ({
  type: registrationConstants.THUMB_UPDATE_SUCCESS,
  payload: data,
});
export const updateRegistrationFailAction = (error) => ({
  type: registrationConstants.THUMB_UPDATE_FAIL,
  payload: error,
});
export const verifyChequeRequestSuccessAction = (data) => ({
  type: registrationConstants.VERIFY_CHEQUE_REQUEST_SUCCESS,
  payload: data,
});
export const verifyChequeRequestFailAction = (error) => ({
  type: registrationConstants.VERIFY_CHEQUE_REQUEST_FAIL,
  payload: error,
});
export const verifyStatementRequestSuccessAction = (data) => ({
  type: registrationConstants.VERIFY_STATEMENT_REQUEST_SUCCESS,
  payload: data,
});
export const verifyStatementRequestFailAction = (error) => ({
  type: registrationConstants.VERIFY_STATEMENT_REQUEST_FAIL,
  payload: error,
});
export const verifyRegistrationFailAction = (error) => ({
  type: registrationConstants.THUMB_VERIFY_FAIL,
  payload: error,
});

export const getParticularApplicationSuccessAction = (data) => ({
  type: registrationConstants.GET_PARTICULAR_APPLICATION_SUCCESS,
  payload: data,
});
export const getParticularApplicationFailAction = (error) => ({
  type: registrationConstants.GET_PARTICULAR_APPLICATION_FAIL,
  payload: error,
});

export const getSpecificAccountSuccessAction = (data) => ({
  type: registrationConstants.GET_SPECIFIC_ACCOUNT_SUCCESS,
  payload: data,
});
export const getSpecificAccountFailAction = (error) => ({
  type: registrationConstants.GET_SPECIFIC_ACCOUNT_FAIL,
  payload: error,
});

export const clearSpecificAccount = () => ({
  type: registrationConstants.CLEAR_SPECIFIC_ACCOUNT,
});

// bank
export const getBranchesSuccessAction = (data) => ({
  type: registrationConstants.GET_BRANCHES_SUCCESS,
  payload: data,
});
export const getBranchesFailAction = (error) => ({
  type: registrationConstants.GET_BRANCHES_FAIL,
  payload: error,
});
export const getChequesSuccessAction = (data) => ({
  type: registrationConstants.GET_CHEQUES_SUCCESS,
  payload: data,
});
export const getChequesFailAction = (error) => ({
  type: registrationConstants.GET_CHEQUES_FAIL,
  payload: error,
});

export const getStatementsSuccessAction = (data) => ({
  type: registrationConstants.GET_STATEMENTS_SUCCESS,
  payload: data,
});
export const getStatementsFailAction = (error) => ({
  type: registrationConstants.GET_STATEMENTS_FAIL,
  payload: error,
});
export const getAccountSignaturesSuccessAction = (data) => ({
  type: registrationConstants.GET_ACCOUNT_SIGNATURES_SUCCESS,
  payload: data,
});
export const getAccountSignaturesFailAction = (error) => ({
  type: registrationConstants.GET_ACCOUNT_SIGNATURES_FAIL,
  payload: error,
});

export const clearResponseText = () => ({
  type: registrationConstants.CLEAR_RESPONSE_TEXT,
});
