import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../utils/image";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { Link } from "react-router-dom";
import logo from "../../img/logo/logo.png";
import { useHistory } from "react-router-dom";
import {
  createRegistration,
  getBranches,
} from "../../Redux/Registration/thunk";
import { useDispatch } from "react-redux";
import { errorFunction } from "../../component/Alert";
import { dateFormater } from "../../utils/dateFormater";
const Account = () => {
  const dispatch = useDispatch();
  const [lock, setLock] = useState(false);
  const history = useHistory();
  //initial state of the form
  const data = {
    salutation: "",
    accountCategory: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    branch: "",
    mobileNo: "",
    sameAddress: false,
    permanentAddress: "",
    temporaryAddress: "",
    dateOfBirthAd: "",
    identificationType: "",
    identificationNo: "",
    issuedDateAd: "",
    issuedPlace: "",
    idFrontFile: "",
    idBackFile: "",
  };
  const [initialValues, setInitialValues] = useState(data);
  const [currentStep, setCurrentStep] = useState(0);
  const handleNextStep = (values, final = false) => {
    setInitialValues((prev) => ({ ...prev, ...values }));

    if (final) {
      onSubmit(values);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = (newData) => {
    setInitialValues((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  //   const dispatch = useDispatch();

  //validation rules
  const validationSchemaOne = Yup.object().shape({
    salutation: Yup.string().required("Salutation is required."),
    accountCategory: Yup.string().required("Category is required."),
    firstName: Yup.string()
      .required("First name is required.")
      .min(2, "First name must be at least 2 characters."),
    middleName: Yup.string(),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(2, "Last Name must be at least 2 characters."),
    permanentAddress: Yup.string().required("Permanent address is required."),
    temporaryAddress: Yup.string().required("Temporary address is required."),
    mobileNo: Yup.string()
      .required("Mobile number is required")
      .matches(
        /^[9]\d{9}$/,
        "Mobile number should start with 9 and should be 10 digits."
      ),
    email: Yup.string().email().required("Email is required."),
    dateOfBirthAd: Yup.date()
      .max(new Date(), "Date of birth can not be greater than today's date.")
      .required("Date of birth is required"),
    branch: Yup.string().required("Branch is required"),
  });

  const validationSchemaTwo = Yup.object().shape({
    identificationType: Yup.string().required(
      "Identification type is required"
    ),
    identificationNo: Yup.string().required(
      "Identification document number is required"
    ),
    issuedDateAd: Yup.date()
      .max(new Date(), "Issued Date can not be greater than today's date.")
      .required("Issued Date is required"),
    issuedPlace: Yup.string().required("Issued place is required"),
    idFrontFile: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB",
        (file) => !file || (file && file.size <= FILE_SIZE)
      )
      .test(
        "fileType",
        "Unsupported File Format",
        (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
      )
      .required("Front file is required"),
    idBackFile: Yup.mixed()
      .test(
        "fileSize",
        "File Size is too large, max file size is 500 KB",
        (file) => !file || (file && file.size <= FILE_SIZE)
      )
      .test(
        "fileType",
        "Unsupported File Format",
        (file) => !file || (file && SUPPORTED_FORMATS.includes(file.type))
      )
      .required("Back file is required"),
  });
  const steps = [
    <StepOne
      handleNextStep={handleNextStep}
      initialValues={initialValues}
      validationSchemaOne={validationSchemaOne}
    />,
    <StepTwo
      validationSchemaTwo={validationSchemaTwo}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      initialValues={initialValues}
      validationSchemaOne={validationSchemaOne}
      lock={lock}
    />,
  ];
  const onSubmit = async (values) => {
    setLock(true);
    const birthDate = dateFormater(values.dateOfBirthAd);
    const issuedDate = dateFormater(values.issuedDateAd);
    const updatedValues = {
      ...values,
      dateOfBirthAd: birthDate,
      issuedDateAd: issuedDate,
    };
    const result = await dispatch(createRegistration(updatedValues));
    if (result) {
      history.push("/success");
    } else {
      errorFunction("Oops! Something went wrong, Please try again.");
    }
    // setLock(false);
  };

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);
  return (
    <>
      <header className="kyc-header account-head">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="header-img">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="header-icons-group">
                <h2>Open an account online</h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      {steps[currentStep]}
    </>
  );
};
export default Account;
