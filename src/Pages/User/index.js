import React, { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import { samples } from "../../utils/common";
import { Link } from "react-router-dom";
import logo from "../../img/logo/logo.png";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../component/TextError";
import DatePicker from "react-datepicker";
import TextBox from "../../component/TextBox";
import ImageBox from "../../component/ImageBox";
import { imageConvertor } from "../../utils/imageConvertor";
import { createUser } from "../../Redux/User/thunk";
import {
  successFunction,
  errorFunction,
  toastSuccessFunction,
} from "../../component/Alert";
import { dateFormater } from "../../utils/dateFormater";
import Mandatory from "../../component/Mandatory";
import { useSelector, useDispatch } from "react-redux";
import { userConstants } from "../../Redux/User/constants";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Loader from "../../component/Loader";
import $ from "jquery";
const User = () => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [signatures, setSignatures] = useState(["", ""]);
  const [signaturesText, setSignaturesText] = useState(["", ""]);
  const [signatureFile1, setSignatureFile1] = useState("");
  const [signatureFile2, setSignatureFile2] = useState("");
  const [imgSrc, setImgSrc] = useState([]);
  const loading_user = useSelector((state) => state.user.loading_user);
  const dispatch = useDispatch();
  const [lock, setLock] = useState(false);
  const history = useHistory();
  const imgGallery = useSelector((state) => state.user.imgGallery);
  //initial state of the form
  const data = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    userName: "",
    password: "",
    sameAddress: false,
    permanentAddress: "",
    temporaryAddress: "",
    dateOfBirthAd: "",
  };
  const [initialValues] = useState(data);
  const [type, setType] = useState("password");

  // toggle password
  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  //validation rules
  const validationSchema = Yup.object().shape({
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
        "Mobile number should start with 98 and should be 10 digits."
      ),
    email: Yup.string().email().required("Email is required"),
    dateOfBirthAd: Yup.date()
      .max(new Date(), "Date of birth can not be greater than today's date.")
      .required("Date of birth is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  //   fingerprint
  const [sdk, setSdk] = useState(null);
  const [myVal, setMyVal] = useState("");
  const [acquisitionStarted, setAcquisitionStarted] = useState(false);
  const [currentFormat] = useState(samples[3]);

  const FingerprintSdkTest = (sdkObtained) => {
    sdkObtained.onDeviceConnected = (e) => {
      setDeviceConnected(true);
    };
    sdkObtained.onDeviceDisconnected = (e) => {
      // Detects if device gets disconnected - provides deviceUid of disconnected device
      if (e.deviceUid !== "00000000-0000-0000-0000-000000000000") {
        setDeviceConnected(false);
        errorFunction("Device disconnected");
        // setMyVal("");
      }
    };
    sdkObtained.onCommunicationFailed = (e) => {
      // Detects if there is a failure in communicating with U.R.U web SDK
      // errorFunction("Communication Failed");
    };
    sdkObtained.onSamplesAcquired = async (s) => {
      // Sample acquired event triggers this function

      sampleAcquired(s);
    };
    sdkObtained.onQualityReported = (e) => {
      // Quality of sample acquired - Function triggered on every sample acquired
      // setQuality(window.Fingerprint.QualityCode[e.quality]);
    };
  };

  // list of the devices
  const getDevices = async (sdkObtained) => {
    let obtainedDevices = await sdkObtained.enumerateDevices();
    // const updated = obtainedDevices.map((device) => {
    //   return { name: device, id: device };
    // });
    if (obtainedDevices.length === 0) {
      // errorFunction("No Reader Detected.Please connect a reader");
    } else if (obtainedDevices.length === 1) {
      setMyVal(obtainedDevices[0]);
    }

    // setDevices(updated);
  };
  useEffect(() => {
    // localStorage.clear();
    localStorage.removeItem("imgGallery");
    let sdkObtained = new window.Fingerprint.WebApi();

    FingerprintSdkTest(sdkObtained);
    setSdk(sdkObtained);
    getDevices(sdkObtained);
  }, []);
  const handleStart = async () => {
    if (myVal === "") {
      if (deviceConnected) {
        // localStorage.clear();
        localStorage.removeItem("imgGallery");
        let sdkObtained = new window.Fingerprint.WebApi();

        FingerprintSdkTest(sdkObtained);
        setSdk(sdkObtained);
        getDevices(sdkObtained);
      } else {
        toastSuccessFunction("Please connect a device.");
      }
    } else {
      // setQuality("");

      await startCapture(currentFormat, myVal);
    }
  };
  useEffect(() => {
    if (imgGallery?.length === 1 || imgGallery?.length === 2) {
      stopCapture();
    }
  }, [imgGallery]);
  const stopCapture = async () => {
    if (!acquisitionStarted) {
      return;
    }
    try {
      await sdk.stopAcquisition(myVal);

      setAcquisitionStarted(false);
      // setDisableExport(false);

      //Disabling start once started
      // disableEnableStartStop(false);
    } catch (error) {
      errorFunction(error.message);
    }
  };

  // const handleClear = (val) => {
  //   localStorage.setItem("imageSrc", "");
  //   localStorage.setItem("wsq", "");
  //   localStorage.setItem("raw", "");
  //   localStorage.setItem("intermediate", "");
  //   // const data = imgGallery.map((dat, i) => {
  //   //   if (i === val) {
  //   //     return "";
  //   //   }
  //   // });
  //   toastSuccessFunction("Fingerprint cleared successfully", 2000);
  //   dispatch({
  //     type: userConstants.FINGERPRINT_UPDATED,
  //     payload: data,
  //   });
  // };

  const startCapture = async (currentFormat, device) => {
    const formatId = currentFormat.id;
    const deviceId = device.id;

    if (acquisitionStarted) {
      return;
    }
    try {
      toastSuccessFunction("Please,Place your finger on the device.", 2000);
      await sdk.startAcquisition(formatId, deviceId);

      setAcquisitionStarted(true);

      //Disabling start once started
    } catch (error) {
      errorFunction(error.message);
    }
  };

  const sampleAcquired = async (s) => {
    if (currentFormat.id === window.Fingerprint.SampleFormat.PngImage) {
      // If sample acquired format is PNG- perform following call on object recieved
      // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
      localStorage.setItem("imageSrc", "");
      const samples = JSON.parse(s.samples);
      toastSuccessFunction("Fingerprint is successfully captured", 2000);
      localStorage.setItem(
        "imageSrc",
        "data:image/png;base64," + window.Fingerprint.b64UrlTo64(samples[0])
      );
      const image = localStorage.getItem("imageSrc");

      dispatch({
        type: userConstants.FINGERPRINT_ADDED,
        payload: image,
      });
    } else {
      // setFingerPrint(null);
      errorFunction("Format Error");
      // setDisableExport(true);
    }
  };

  //   signature
  // signature
  const boxStyle = {
    height: "59mm",
    width: "100mm",
    border: "1px solid #000",
    margin: "auto",
  };
  useEffect(() => {
    window.test();
  }, []);

  const onSubmit = async (values) => {
    setLock(true);
    const ffs1 = signaturesText[0] !== "" ? signaturesText[0] : "";
    const ffs2 = signaturesText[1] !== "" ? signaturesText[1] : "";

    const dynamicSignatureFile1 = signatures[0]
      ? await imageConvertor(signatures[0], "signatureFile1.png", "image/png")
      : null;

    const dynamicSignatureFile2 = signatures[1]
      ? await imageConvertor(signatures[1], "signatureFile2.png", "image/png")
      : null;

    const staticSignatureFile1 =
      signatureFile1 !== ""
        ? await imageConvertor(signatureFile1, "signature.png", "image/png")
        : null;
    const staticSignatureFile2 =
      signatureFile2 !== ""
        ? await imageConvertor(signatureFile2, "signature.png", "image/png")
        : null;

    const leftFingerPrintFile1 = imgGallery[0]
      ? await imageConvertor(
          imgGallery[0],
          "leftFingerPrintFile1.png",
          "image/png"
        )
      : null;
    const rightFingerPrintFile1 = imgGallery[1]
      ? await imageConvertor(
          imgGallery[1],
          "rightFingerPrintFile1.png",
          "image/png"
        )
      : null;
    const leftFingerPrintFile2 = imgGallery[2]
      ? await imageConvertor(
          imgGallery[2],
          "leftFingerPrintFile2.png",
          "image/png"
        )
      : null;
    const rightFingerPrintFile2 = imgGallery[3]
      ? await imageConvertor(
          imgGallery[3],
          "rightFingerPrintFile2.png",
          "image/png"
        )
      : null;
    const date =
      values?.dateOfBirthAd !== "" ? dateFormater(values?.dateOfBirthAd) : null;
    const data = {
      ...values,
      dateOfBirthAd: date,
      signatureFss1: ffs1,
      signatureFss2: ffs2,
      signatureDynamicFile1: dynamicSignatureFile1,
      signatureDynamicFile2: dynamicSignatureFile2,
      signatureStaticFile1: staticSignatureFile1,
      signatureStaticFile2: staticSignatureFile2,
      leftFingerPrintText1: imgGallery[0] ? imgGallery[0] : "",
      leftFingerPrintFile1: leftFingerPrintFile1,
      rightFingerPrintText1: imgGallery[1] ? imgGallery[1] : "",
      rightFingerPrintFile1: rightFingerPrintFile1,
      leftFingerPrintText2: imgGallery[2] ? imgGallery[2] : "",
      leftFingerPrintFile2: leftFingerPrintFile2,
      rightFingerPrintText2: imgGallery[3] ? imgGallery[3] : "",
      rightFingerPrintFile2: rightFingerPrintFile2,
    };
    const result = await dispatch(createUser(data));
    if (result) {
      history.push("/user");
    }
  };

  const handleSignatureCapture = (pos) => {
    window.capture(
      signatures,
      setSignatures,
      signaturesText,
      setSignaturesText,
      pos
    );
  };
  const handleSignatureClear = async (pos) => {
    const updatedSignatures = signatures.map((sign, i) => {
      if (i === pos) {
        return "";
      } else {
        return sign;
      }
    });
    const updatedSignaturesText = signaturesText.map((sign, i) => {
      if (i === pos) {
        return "";
      } else {
        return sign;
      }
    });
    setSignatures(updatedSignatures);
    setSignaturesText(updatedSignaturesText);
  };
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
                <h2>Create User</h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="kyc-wrap">
        <div className="container">
          <div className="kyc-details">
            <div className="kyc-block-2">
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form autoComplete="off" className="kyc-form">
                      <div className="row">
                        <div className="col-lg-3 col-md-4">
                          <div className="form-group">
                            <label htmlFor="firstName">
                              First Name <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                            />
                            <ErrorMessage
                              name="firstName"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                          <div className="form-group">
                            <label htmlFor="middleName">Middle Name</label>
                            <input
                              type="text"
                              name="middleName"
                              placeholder="Middle Name"
                            />
                            <ErrorMessage
                              name="middleName"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-4">
                          <div className="form-group">
                            <label htmlFor="lastName">
                              Last Name <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                            />
                            <ErrorMessage
                              name="lastName"
                              component={TextError}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-4">
                          <div className="form-group">
                            <label htmlFor="email">
                              Email <Mandatory />
                            </label>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                            />
                            <ErrorMessage name="email" component={TextError} />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="mobileNo">
                              Mobile Number <Mandatory />
                            </label>
                            <Field
                              type="number"
                              name="mobileNo"
                              placeholder="Mobile Number"
                            />
                            <ErrorMessage
                              name="mobileNo"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="userName">
                              Username <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="userName"
                              placeholder="Username"
                            />
                            <ErrorMessage
                              name="userName"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group password-eye">
                            <label htmlFor="password">Password</label>
                            <Field
                              type={type}
                              name="password"
                              className="form-control"
                              placeholder="Password"
                            />
                            <ErrorMessage
                              name="password"
                              component={TextError}
                            />
                            <span onClick={handleClick}>
                              {type === "password" ? (
                                <span className=" field-icon-user ">
                                  <BsFillEyeSlashFill />
                                </span>
                              ) : (
                                <span className=" field-icon-user ">
                                  <BsFillEyeFill />
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group ">
                            <div className="permanent ml-4">
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                name="sameAddress"
                                id="exampleCheck-1"
                                checked={formik.values.sameAddress}
                                onClick={(e) => {
                                  if (!e.target.value === true) {
                                    formik.setFieldValue(
                                      "temporaryAddress",
                                      formik.values.permanentAddress
                                    );
                                  }

                                  formik.setFieldValue(
                                    "sameAddress",
                                    !e.target.value
                                  );
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheck-1"
                                // className="exampleCheck-1"
                              >
                                Both permanent and temporary address are same
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="permanentAddress">
                              Permanent Address <Mandatory />
                            </label>
                            <input
                              type="text"
                              name="permanentAddress"
                              placeholder="Permanent Address"
                              value={formik.values.permanentAddress}
                              onChange={(e) => {
                                if (formik.values.sameAddress === true) {
                                  formik.setFieldValue(
                                    "permanentAddress",
                                    e.target.value
                                  );
                                  formik.setFieldValue(
                                    "temporaryAddress",
                                    e.target.value
                                  );
                                } else {
                                  formik.setFieldValue(
                                    "permanentAddress",
                                    e.target.value
                                  );
                                }
                              }}
                            />
                            <ErrorMessage
                              name="permanentAddress"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="temporaryAddress">
                              Temporary Address <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="temporaryAddress"
                              placeholder="Temporary Address"
                            />
                            <ErrorMessage
                              name="temporaryAddress"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group date">
                            <label htmlFor="dateOfBirthAd">
                              Date of Birth <Mandatory />
                            </label>

                            <DatePicker
                              name="dateOfBirthAd"
                              selected={formik.values.dateOfBirthAd}
                              showMonthDropdown
                              showYearDropdown
                              dateFormat="yyyy/MM/dd"
                              placeholderText="YYYY-MM-DD"
                              dropdownMode="select"
                              // className="form-control"
                              onChange={(date) => {
                                formik.setFieldValue("dateOfBirthAd", date);
                              }}
                            />
                            {/* </div> */}
                            <ErrorMessage
                              name="dateOfBirthAd"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <span>
                              <h3>Finger Print</h3>
                            </span>
                            <div className="finger-wrap">
                              <div className="file-upload">
                                <div className="image-upload-wrap">
                                  <div className="drag-text">
                                    <h3>Left</h3>
                                  </div>
                                  <div
                                    className="ml-4"
                                    style={{ marginTop: "-7px" }}
                                  >
                                    <ImageBox
                                      img={imgGallery[0] ? imgGallery[0] : ""}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="file-upload">
                                <div className="image-upload-wrap">
                                  <div className="drag-text">
                                    <h3>right</h3>
                                  </div>
                                  <div
                                    className="ml-4"
                                    style={{ marginTop: "-7px" }}
                                  >
                                    <ImageBox
                                      img={imgGallery[1] ? imgGallery[1] : ""}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn btn-success mr-5 ml-5"
                            onClick={handleStart}
                            disabled={
                              imgGallery?.length >= 1 && imgGallery[0] !== ""
                            }
                          >
                            Capture
                          </button>
                          {/* <button
                                type="button"
                                className="btn btn-danger "
                                onClick={() => handleClear(0)}
                                disabled={
                                  imgGallery[0] === "" ||
                                  imgGallery[0] === undefined
                                }
                              >
                                Clear
                              </button> */}
                          <button
                            type="button"
                            className="btn btn-success mr-5 ml-5"
                            onClick={handleStart}
                            disabled={
                              imgGallery?.length >= 2 && imgGallery[1] !== ""
                            }
                          >
                            Capture
                          </button>
                          {/* <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleClear(1)}
                                disabled={
                                  imgGallery[1] === "" ||
                                  imgGallery[1] === undefined
                                }
                              >
                                Clear
                              </button> */}
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <span>
                              <h3>Finger Print</h3>
                            </span>
                            <div className="finger-wrap">
                              <div className="file-upload">
                                <div className="image-upload-wrap">
                                  <div className="drag-text">
                                    <h3>Left</h3>
                                  </div>
                                  <div
                                    className="ml-4"
                                    style={{ marginTop: "-7px" }}
                                  >
                                    <ImageBox
                                      img={imgGallery[2] ? imgGallery[2] : ""}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="image-upload-wrap">
                                  <div className="drag-text">
                                    <h3>right</h3>
                                  </div>
                                  <div
                                    className="ml-4"
                                    style={{ marginTop: "-7px" }}
                                  >
                                    <ImageBox
                                      img={imgGallery[3] ? imgGallery[3] : ""}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-success mr-5 ml-5"
                            onClick={handleStart}
                            disabled={
                              imgGallery?.length >= 3 && imgGallery[2] !== ""
                            }
                          >
                            Capture
                          </button>
                          {/* <button
                                type="button"
                                className="btn btn-danger "
                                onClick={() => handleClear(2)}
                                disabled={
                                  imgGallery[2] === "" ||
                                  imgGallery[2] === undefined
                                }
                              >
                                Clear
                              </button> */}
                          <button
                            type="button"
                            className="btn btn-success mr-5 ml-5"
                            onClick={handleStart}
                            disabled={
                              imgGallery?.length >= 4 && imgGallery[3] !== ""
                            }
                          >
                            Capture
                          </button>
                          {/* <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleClear(3)}
                                disabled={
                                  imgGallery[3] === "" ||
                                  imgGallery[3] === undefined
                                }
                              >
                                Clear
                              </button> */}
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group ">
                            <span>
                              <h3>Dynamic Signature</h3>
                            </span>
                            <div className=" boxed" style={boxStyle}>
                              {signatures[0] !== "" && (
                                <img src={signatures[0]} alt="signature" />
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn btn-success mr-5 ml-5 mt-3"
                              onClick={() => handleSignatureCapture(0)}
                            >
                              Capture
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger ml-5 mt-3"
                              onClick={() => handleSignatureClear(0)}
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group ">
                            <span>
                              <h3>Dynamic Signature</h3>
                            </span>
                            <div className="boxed" style={boxStyle}>
                              {signatures[1] !== "" && (
                                <img src={signatures[1]} alt="signature" />
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn btn-success mr-5 ml-5 mt-3"
                              onClick={() => handleSignatureCapture(1)}
                            >
                              Capture
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger ml-5 mt-3"
                              onClick={() => handleSignatureClear(1)}
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="site-button">
                            <button
                              type="submit"
                              className="site-button-"
                              disabled={lock}
                              // onClick={handleSubmit}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      {loading_user && <Loader />}
    </>
  );
};
export default User;
