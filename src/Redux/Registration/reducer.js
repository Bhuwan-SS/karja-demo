import { registrationConstants } from "./constants";
const initialState = {
  applications: [],
  searchedApplications: [],
  searchText: "",
  application: null,
  account: null,
  loadingAccount: false,
  cheques: [],
  statements: [],
  edit: false,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loading_update: false,
  loading_applications: false,
  loading_particular: false,
  loading_verify: false,
  id: "",
  accountSignatures: [],
  imgGallery: [],
  branches: [],
  chequeData: null,
  fingerPosition: 0,
  responseText: "",
  loadingVerifyFingerprint: false,
  loadingVerifySignature: false,
};
const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case registrationConstants.LOADING_REGISTRATION:
      return { ...state, loading: true };
    case registrationConstants.LOADING_CHEQUE:
      return { ...state, loading_cheque: true };

    case registrationConstants.LOADING_VERIFY_FINGERPRINT:
      return { ...state, loadingVerifyFingerprint: true };

    case registrationConstants.LOADING_VERIFY_SIGNATURE:
      return { ...state, loadingVerifySignature: true };

    case registrationConstants.LOADING_STATEMENT:
      return { ...state, loading_statement: true };
    case registrationConstants.LOADING_VERIFY:
      return { ...state, loading_verify: true };
    case registrationConstants.LOADING_UPDATE:
      return { ...state, loading_update: true };
    case registrationConstants.LOADING_APPLICATIONS:
      return { ...state, loading_applications: true };
    case registrationConstants.LOADING_PARTICULAR:
      return { ...state, loading_particular: true };
    case registrationConstants.LOADING_SPECIFIC_ACCOUNT:
      return { ...state, loadingAccount: true };
    case registrationConstants.VERIFY_FINGERPRINT_SUCCESS:
      return {
        ...state,
        loadingVerifyFingerprint: false,
        responseText: "Fingerprints matched",
      };
    case registrationConstants.VERIFY_FINGERPRINT_FAIL:
      return {
        ...state,
        loadingVerifyFingerprint: false,
        responseText: "Fingerprints didn't match",
      };

    case registrationConstants.VERIFY_SIGNATURE_SUCCESS:
      return {
        ...state,
        loadingVerifySignature: false,
        responseText: "Signature  matched",
      };
    case registrationConstants.VERIFY_SIGNATURE_FAIL:
      return {
        ...state,
        loadingVerifySignature: false,
        responseText: "Signature didn't match",
      };
    case registrationConstants.GET_SPECIFIC_ACCOUNT_SUCCESS:
      return {
        ...state,
        loadingAccount: false,
        account: action.payload,
      };
    case registrationConstants.GET_SPECIFIC_ACCOUNT_FAIL:
      return {
        ...state,
        loadingAccount: false,
      };

    case registrationConstants.GET_APPLICATIONS_SUCCESS:
      return {
        ...state,
        applications: action.payload,
        loading_applications: false,
        loading_update: false,
        loading: false,
      };
    case registrationConstants.GET_APPLICATIONS_FAIL:
      return {
        ...state,
        applications: [],
        loading_applications: false,
        loading_update: false,
        loading: false,
      };
    case registrationConstants.REGISTRATION_SUCCESS:
      return {
        ...state,
        applications: [...state.applications, action.payload],
        id: action.payload.accountApplicationId,
        loading: false,
      };
    case registrationConstants.REGISTRATION_FAIL:
      return { ...state, loading: false };
    case registrationConstants.GET_PARTICULAR_APPLICATION_SUCCESS:
      return {
        ...state,
        application: action.payload,
        loading_particular: false,
      };
    case registrationConstants.GET_PARTICULAR_APPLICATION_FAIL:
      return {
        ...state,
        loading_particular: false,
      };
    case registrationConstants.THUMB_VERIFY_SUCCESS:
      return { ...state, loading_verify: false };
    case registrationConstants.THUMB_VERIFY_FAIL:
      return { ...state, loading_verify: false };
    case registrationConstants.THUMB_UPDATE_FAIL:
      return { ...state, loading_update: false };
    case registrationConstants.FINGERPRINT_ADDED:
      return { ...state, imgGallery: [...state.imgGallery, action.payload] };
    case registrationConstants.FINGERPRINT_UPDATED:
      return { ...state, imgGallery: action.payload };
    case registrationConstants.GET_BRANCHES_SUCCESS:
      return { ...state, branches: action.payload };
    case registrationConstants.GET_BRANCHES_FAIL:
      return { ...state, branches: [] };
    case registrationConstants.GET_CHEQUES_SUCCESS:
      return { ...state, cheques: action.payload };
    case registrationConstants.GET_CHEQUES_FAIL:
      return { ...state, cheques: [] };
    case registrationConstants.GET_STATEMENTS_SUCCESS:
      return { ...state, statements: action.payload };
    case registrationConstants.GET_STATEMENTS_FAIL:
      return { ...state, statements: [] };
    case registrationConstants.GET_ACCOUNT_SIGNATURES_SUCCESS:
      return { ...state, accountSignatures: action.payload };
    case registrationConstants.GET_ACCOUNT_SIGNATURES_FAIL:
      return { ...state, accountSignatures: [] };

    case registrationConstants.ACCOUNT_EDIT_SUCCESS:
      return {
        ...state,
        application: state.applications.find(
          (application) => application.accountApplicationId === action.payload
        ),
        imgGallery: [],
        edit: true,
      };
    case registrationConstants.VERIFY_CHEQUE_REQUEST_SUCCESS:
      return { ...state, loading_cheque: false, responseText: action.payload };
    case registrationConstants.VERIFY_CHEQUE_REQUEST_FAIL:
      return { ...state, loading_cheque: false, responseText: action.payload };
    case registrationConstants.VERIFY_STATEMENT_REQUEST_SUCCESS:
      return {
        ...state,
        loading_statement: false,
        responseText: action.payload,
      };
    case registrationConstants.VERIFY_STATEMENT_REQUEST_FAIL:
      return {
        ...state,
        loading_statement: false,
        responseText: action.payload,
      };
    case registrationConstants.CLEAR_IMAGE_GALLERY:
      return { ...state, imgGallery: [] };
    case registrationConstants.SEARCH_SUCCESS:
      return {
        ...state,
        searchedApplications: action.payload.data,
        searchText: action.payload.search,
      };
    case registrationConstants.CHEQUE_DATA:
      return {
        ...state,
        chequeData: action.payload,
      };
    case registrationConstants.FINGER_POSITION:
      return {
        ...state,
        fingerPosition: action.payload,
      };
    case registrationConstants.CLEAR_RESPONSE_TEXT:
      return {
        ...state,
        responseText: "",
      };
    case registrationConstants.CLEAR_SPECIFIC_ACCOUNT:
      return {
        ...state,
        account: null,
      };
    default:
      return state;
  }
};
export default registrationReducer;
