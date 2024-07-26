import React, { useEffect, useState, lazy, Suspense } from "react";
import { samples } from "../../utils/common";
import { errorFunction, toastSuccessFunction } from "../Alert";
import ImageBox from "../ImageBox";
import { useSelector, useDispatch } from "react-redux";
import { registrationConstants } from "../../Redux/Registration/constants";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../component/TextError";
import { imageConvertor } from "../../utils/imageConvertor";
import { updateApplication } from "../../Redux/Registration/thunk";
import Loader from "../Loader";
import $ from "jquery";
import capture from "../../img/m_header.png";
import "../../Modal/modal.css";
const CameraModal = lazy(() => import("../../Modal/CameraModal"));
const CropModal = lazy(() => import("../../Modal/CropModal"));
const SidebarEdit = ({ showModal, setShowModal }) => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [signatures, setSignatures] = useState(["", ""]);
  const [signaturesText, setSignaturesText] = useState(["", ""]);
  const modalClass = showModal
    ? "modal sidebar-edit display-block "
    : "modal display-none";
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showStaticSignature1CropModal, setShowStaticSignature1CropModal] =
    useState(false);
  const [showStaticSignature2CropModal, setShowStaticSignature2CropModal] =
    useState(false);

  const [imgSrc, setImgSrc] = useState([]);
  const [croppedImage, setCroppedImage] = useState("");
  const [signatureFile1, setSignatureFile1] = useState("");
  const [signatureFile2, setSignatureFile2] = useState("");
  const loading_update = useSelector(
    (state) => state.registration.loading_update
  );
  const [lock, setLock] = useState(false);
  const application = useSelector((state) => state.registration.application);
  const edit = useSelector((state) => state.registration.edit);
  const initialValues = {
    accountCategory: edit ? application.accountCategory : "",
    firstName: edit ? application.firstName : "",
    middleName: edit ? application.middleName : "",
    lastName: edit ? application.lastName : "",
    email: edit ? application.email : "",
    mobileNo: edit ? application.mobileNo : "",
    permanentAddress: edit ? application.permanentAddress : "",
    remarks: "",
  };
  //validation rules
  const validationSchema = Yup.object().shape({
    accountCategory: Yup.string(),
    firstName: Yup.string()
      .required("First name is required.")
      .min(2, "First name must be at least 2 characters."),
    middleName: Yup.string(),
    lastName: Yup.string()
      .required("Last name is required.")
      .min(2, "Last Name must be at least 2 characters."),
    permanentAddress: Yup.string().required("Permanent address is required."),
    mobileNo: Yup.string()
      .required("Mobile number is required")
      .matches(
        /^[9]\d{9}$/,
        "Mobile number should start with 98 and should be 10 digits."
      ),
    email: Yup.string().email().required("Email is required"),
    remarks: Yup.string(),
  });

  const dispatch = useDispatch();
  const imgGallery = useSelector((state) => state.registration.imgGallery);
  // fingerprint props
  const [sdk, setSdk] = useState(null);
  const [myVal, setMyVal] = useState("");

  const [acquisitionStarted, setAcquisitionStarted] = useState(false);

  const [currentFormat] = useState(samples[3]);
  // fingerprint

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
      errorFunction("Communication Failed");
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
  //   const data = imgGallery.map((dat, i) => {
  //     if (i === val) {
  //       return "";
  //     }
  //   });
  //   toastSuccessFunction("Fingerprint cleared successfully", 2000);
  //   dispatch({
  //     type: registrationConstants.FINGERPRINT_UPDATED,
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
        type: registrationConstants.FINGERPRINT_ADDED,
        payload: image,
      });
    } else {
      // setFingerPrint(null);
      errorFunction("Format Error");
      // setDisableExport(true);
    }
  };
  // signature
  const boxStyle = {
    height: "202px",
    width: "402px",
    border: "1px solid #000",
  };

  useEffect(() => {
    window.test();
  }, []);


  const onSubmit = async (values) => {
    setLock(true);
    // if (signatureFile1 === "" || signatureFile2 === "") {
    //   errorFunction("Please capture all the signatures.");
    //   setLock(false);
    // } else {
    $(function () {
      $("#sidebarEditPopUP").modal("toggle");
    });
    const ffs1 = signaturesText[0] !== "" ? signaturesText[0] : "";
    const ffs2 = signaturesText[1] !== "" ? signaturesText[1] : "";
    const userPhoto = await imageConvertor(
      croppedImage,
      "photo.png",
      "image/png"
    );
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
    const data = {
      ...values,
      userPhoto: userPhoto ? userPhoto : null,
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
    await dispatch(updateApplication(data, application.accountApplicationId));
    setLock(false);

    setShowModal(false);
    // }
  };

  const handleStaticSignature1 = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSignatureFile1(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setShowStaticSignature1CropModal(true);
  };
  const handleStaticSignature2 = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSignatureFile2(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setShowStaticSignature2CropModal(true);
  };
  // const handleStaticSignature3 = (e) => {
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setSignatureFile3(reader.result);
  //   };
  //   reader.readAsDataURL(files[0]);
  //   setShowStaticSignature3CropModal(true);
  // };
  // const handleStaticSignature4 = (e) => {
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setSignatureFile4(reader.result);
  //   };
  //   reader.readAsDataURL(files[0]);
  //   setShowStaticSignature4CropModal(true);
  // };
  // const handleStaticSignature5 = (e) => {
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setSignatureFile5(reader.result);
  //   };
  //   reader.readAsDataURL(files[0]);
  //   setShowStaticSignature5CropModal(true);
  // };
  // const handleStaticSignature6 = (e) => {
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setSignatureFile6(reader.result);
  //   };
  //   reader.readAsDataURL(files[0]);
  //   setShowStaticSignature6CropModal(true);
  // };
  const handleClose = () => {
    dispatch({
      type: registrationConstants.CLEAR_IMAGE_GALLERY,
    });
    setSignatures(["", ""]);
    setSignaturesText(["", ""]);
    setSignatureFile1("");
    setSignatureFile2("");
    setShowModal(false);
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
      <div className="modal sidebar-edit display-block ">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={handleClose}>
                &times;
              </button>
              <div className="modal-head">
                <h1 className="modal-title">Edit Modal</h1>
              </div>
            </div>
            <div className="modal-body">
              <section className="kyc-wrap">
                <div className="container-fluid">
                  <div className="kyc-details">
                    <div className="kyc-block-2">
                      <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        {() => {
                          return (
                            <Form autoComplete="off" className="kyc-form">
                              <div className="row">
                                <div className="col-lg-3 col-md-3">
                                  <div className="form-group">
                                    <label htmlFor="firstName">
                                      First Name:
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
                                <div className="col-lg-3 col-md-3">
                                  <div className="form-group">
                                    <label htmlFor="middleName">
                                      Middle Name:
                                    </label>
                                    <Field
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
                                <div className="col-lg-3 col-md-3">
                                  <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
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
                                <div className="col-lg-3 col-md-3">
                                  <div
                                    className="photo-block"
                                    onClick={() => setWebcamEnabled(true)}
                                  >
                                    <img
                                      src={
                                        croppedImage !== ""
                                          ? croppedImage
                                          : capture
                                      }
                                      alt="capture"
                                      height="150"
                                      width="150"
                                    />
                                  </div>

                                  {/* {webcamEnabled && (
                                  <>
                                    <Webcam
                                      className="photo-block"
                                      height="150"
                                      width="150"
                                    />
                                    <button className="btn btn-primary">
                                      capture
                                    </button>
                                  </>
                                )} */}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-lg-4 col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="mobileNo">Mobile No:</label>
                                    <Field
                                      type="number"
                                      name="mobileNo"
                                      placeholder="Mobile No"
                                    />
                                    <ErrorMessage
                                      name="mobileNo"
                                      component={TextError}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="permanentAddress">
                                      Permanent Address:
                                    </label>
                                    <Field
                                      type="text"
                                      name="permanentAddress"
                                      placeholder="Permanent Address"
                                    />
                                    <ErrorMessage
                                      name="permanentAddress"
                                      component={TextError}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <Field
                                      type="email"
                                      name="email"
                                      placeholder="Email"
                                    />
                                    <ErrorMessage
                                      name="email"
                                      component={TextError}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div className="form-group date">
                                    <label htmlFor="text">
                                      account Category
                                    </label>
                                    <div className="form-check form-check-inline">
                                      <Field
                                        className="form-check-input"
                                        type="radio"
                                        name="accountCategory"
                                        id="diamond"
                                        value="DIAMOND"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="diamond"
                                      >
                                        Diamond
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Field
                                        className="form-check-input"
                                        type="radio"
                                        name="accountCategory"
                                        id="gold"
                                        value="GOLD"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="gold"
                                      >
                                        Gold
                                      </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Field
                                        className="form-check-input"
                                        type="radio"
                                        name="accountCategory"
                                        id="silver"
                                        value="SILVER"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="silver"
                                      >
                                        Silver
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="form-group">
                                    <label htmlFor="remarks">Remarks:</label>
                                    <Field
                                      type="text"
                                      name="remarks"
                                      placeholder="Remarks"
                                    />
                                    <ErrorMessage
                                      name="remarks"
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
                                              img={
                                                imgGallery[0]
                                                  ? imgGallery[0]
                                                  : ""
                                              }
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
                                              img={
                                                imgGallery[1]
                                                  ? imgGallery[1]
                                                  : ""
                                              }
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
                                      imgGallery?.length >= 1 &&
                                      imgGallery[0] !== ""
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
                                      imgGallery?.length >= 2 &&
                                      imgGallery[1] !== ""
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
                                              img={
                                                imgGallery[2]
                                                  ? imgGallery[2]
                                                  : ""
                                              }
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
                                              img={
                                                imgGallery[3]
                                                  ? imgGallery[3]
                                                  : ""
                                              }
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
                                      imgGallery?.length >= 3 &&
                                      imgGallery[2] !== ""
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
                                      imgGallery?.length >= 4 &&
                                      imgGallery[3] !== ""
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
                                        <img
                                          src={signatures[0]}
                                          alt="signature"
                                        />
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
                                        <img
                                          src={signatures[1]}
                                          alt="signature"
                                        />
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
                                {/* <div className="col-lg-6">
                                  <div className="form-group ">
                                    <span>
                                      <h3>Dynamic Signature</h3>
                                    </span>
                                    <div className="boxed" style={boxStyle}>
                                      {signatures[2] !== "" && (
                                        <img
                                          src={signatures[2]}
                                          alt="signature"
                                        />
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-success mr-5 ml-5 mt-3"
                                      onClick={() => handleSignatureCapture(2)}
                                    >
                                      Capture
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger ml-5 mt-3"
                                      onClick={() => handleSignatureClear(2)}
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </div> */}
                                {/* <div className="col-lg-6">
                                  <div className="form-group ">
                                    <span>
                                      <h3>Dynamic Signature</h3>
                                    </span>
                                    <div className="boxed" style={boxStyle}>
                                      {signatures[3] !== "" && (
                                        <img
                                          src={signatures[3]}
                                          alt="signature"
                                        />
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-success mr-5 ml-5 mt-3"
                                      onClick={() => handleSignatureCapture(3)}
                                    >
                                      Capture
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger ml-5 mt-3"
                                      onClick={() => handleSignatureClear(3)}
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </div> */}
                                {/* <div className="col-lg-6">
                                  <div className="form-group ">
                                    <span>
                                      <h3>Dynamic Signature</h3>
                                    </span>
                                    <div className="boxed" style={boxStyle}>
                                      {signatures[4] !== "" && (
                                        <img
                                          src={signatures[4]}
                                          alt="signature"
                                        />
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-success mr-5 ml-5 mt-3"
                                      onClick={() => handleSignatureCapture(4)}
                                    >
                                      Capture
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger ml-5 mt-3"
                                      onClick={() => handleSignatureClear(4)}
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </div> */}
                                {/* <div className="col-lg-6">
                                  <div className="form-group ">
                                    <span>
                                      <h3>Dynamic Signature</h3>
                                    </span>
                                    <div className="boxed" style={boxStyle}>
                                      {signatures[5] !== "" && (
                                        <img
                                          src={signatures[5]}
                                          alt="signature"
                                        />
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-success mr-5 ml-5 mt-3"
                                      onClick={() => handleSignatureCapture(5)}
                                    >
                                      Capture
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger ml-5 mt-3"
                                      onClick={() => handleSignatureClear(5)}
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </div> */}
                                {/* <div className="col-lg-6 col-md-6">
                                  <div className="form-group img-upload">
                                    <label
                                      htmlFor="idFrontFile"
                                      style={{ textAlign: "center" }}
                                    >
                                      <h5> Static Signature</h5>
                                    </label>
                                    <div className="file-upload">
                                      <button
                                      className="btn btn-primary mb-2"
                                      type="button"
                                      onClick={clickFront}
                                    >
                                      Browse
                                    </button>
                                      <div className="image-upload-wrap">
                                        <input
                                          type="file"
                                          className="right-dropify"
                                          name="idFrontFile"
                                          onChange={(e) =>
                                            handleStaticSignature1(e)
                                          }
                                        />
                                        <ErrorMessage
                                          name="idFrontFile"
                                          component={TextError}
                                        />
                                      </div>
                                      {signatureFile1 && (
                                        <div className="img_div mt-2">
                                          <img
                                            src={signatureFile1}
                                            alt="signatureFile1"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group img-upload">
                                    <label
                                      htmlFor="idFrontFile"
                                      style={{ textAlign: "center" }}
                                    >
                                      <h5> Static Signature</h5>
                                    </label>
                                    <div className="file-upload">
                                      <button
                                      className="btn btn-primary mb-2"
                                      type="button"
                                      onClick={clickFront}
                                    >
                                      Browse
                                    </button>
                                      <div className="image-upload-wrap1">
                                        <input
                                          type="file"
                                          className="left-dropify"
                                          name="idFrontFile"
                                          onChange={(e) =>
                                            handleStaticSignature2(e)
                                          }
                                        />
                                        <ErrorMessage
                                          name="idFrontFile"
                                          component={TextError}
                                        />
                                      </div>
                                      {signatureFile2 && (
                                        <div className="img_div mt-2">
                                          <img
                                            src={signatureFile2}
                                            alt="signatureFile2"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group img-upload">
                                    <label
                                      htmlFor="idFrontFile"
                                      style={{ textAlign: "center" }}
                                    >
                                      <h5> Static Signature</h5>
                                    </label>
                                    <div className="file-upload">
                                      <button
                                      className="btn btn-primary mb-2"
                                      type="button"
                                      onClick={clickFront}
                                    >
                                      Browse
                                    </button>
                                      <div className="image-upload-wrap1">
                                        <input
                                          type="file"
                                          className="left-dropify"
                                          name="idFrontFile"
                                          onChange={(e) =>
                                            handleStaticSignature3(e)
                                          }
                                        />
                                        <ErrorMessage
                                          name="idFrontFile"
                                          component={TextError}
                                        />
                                      </div>
                                      {signatureFile3 && (
                                        <div className="img_div mt-2">
                                          <img
                                            src={signatureFile3}
                                            alt="signatureFile3"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group img-upload">
                                    <label
                                      htmlFor="idFrontFile"
                                      style={{ textAlign: "center" }}
                                    >
                                      <h5> Static Signature</h5>
                                    </label>
                                    <div className="file-upload">
                                      <button
                                      className="btn btn-primary mb-2"
                                      type="button"
                                      onClick={clickFront}
                                    >
                                      Browse
                                    </button>
                                      <div className="image-upload-wrap1">
                                        <input
                                          type="file"
                                          className="left-dropify"
                                          name="idFrontFile"
                                          onChange={(e) =>
                                            handleStaticSignature4(e)
                                          }
                                        />
                                        <ErrorMessage
                                          name="idFrontFile"
                                          component={TextError}
                                        />
                                      </div>
                                      {signatureFile4 && (
                                        <div className="img_div mt-2">
                                          <img
                                            src={signatureFile4}
                                            alt="signatureFile4"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group img-upload">
                                    <label
                                      htmlFor="idFrontFile"
                                      style={{ textAlign: "center" }}
                                    >
                                      <h5> Static Signature</h5>
                                    </label>
                                    <div className="file-upload">
                                      <button
                                      className="btn btn-primary mb-2"
                                      type="button"
                                      onClick={clickFront}
                                    >
                                      Browse
                                    </button>
                                      <div className="image-upload-wrap1">
                                        <input
                                          type="file"
                                          className="left-dropify"
                                          name="idFrontFile"
                                          onChange={(e) =>
                                            handleStaticSignature5(e)
                                          }
                                        />
                                        <ErrorMessage
                                          name="idFrontFile"
                                          component={TextError}
                                        />
                                      </div>
                                      {signatureFile5 && (
                                        <div className="img_div mt-2">
                                          <img
                                            src={signatureFile5}
                                            alt="signatureFile5"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="form-group img-upload">
                                    <label
                                      htmlFor="idFrontFile"
                                      style={{ textAlign: "center" }}
                                    >
                                      <h5> Static Signature</h5>
                                    </label>
                                    <div className="file-upload">
                                      <button
                                      className="btn btn-primary mb-2"
                                      type="button"
                                      onClick={clickFront}
                                    >
                                      Browse
                                    </button>
                                      <div className="image-upload-wrap1">
                                        <input
                                          type="file"
                                          className="left-dropify"
                                          name="idFrontFile"
                                          onChange={(e) =>
                                            handleStaticSignature6(e)
                                          }
                                        />
                                        <ErrorMessage
                                          name="idFrontFile"
                                          component={TextError}
                                        />
                                      </div>
                                      {signatureFile6 && (
                                        <div className="img_div mt-2">
                                          <img
                                            src={signatureFile6}
                                            alt="signatureFile6"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div> 
                                </div>*/}
                                <div className="col-lg-12">
                                  <div className="site-button">
                                    <button
                                      type="submit"
                                      className="site-button-"
                                      disabled={lock}
                                    >
                                      Save
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
            </div>
          </div>
        </div>
      </div>
      {loading_update && <Loader />}
      {webcamEnabled && (
        <Suspense fallback={<div>Loading...</div>}>
          <CameraModal
            webcamEnabled={webcamEnabled}
            setWebcamEnabled={setWebcamEnabled}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            setShowCropModal={setShowCropModal}
          />
        </Suspense>
      )}
      {showCropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showCropModal}
            setShowCropModal={setShowCropModal}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            croppedImage={croppedImage}
            setCroppedImage={setCroppedImage}
            type="photo"
          />
        </Suspense>
      )}
      {showStaticSignature1CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature1CropModal}
            setShowCropModal={setShowStaticSignature1CropModal}
            imgSrc={signatureFile1}
            setCroppedImage={setSignatureFile1}
          />
        </Suspense>
      )}
      {showStaticSignature2CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature2CropModal}
            setShowCropModal={setShowStaticSignature2CropModal}
            imgSrc={signatureFile2}
            setCroppedImage={setSignatureFile2}
          />
        </Suspense>
      )}
      {/* {showStaticSignature3CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature3CropModal}
            setShowCropModal={setShowStaticSignature3CropModal}
            imgSrc={signatureFile3}
            setCroppedImage={setSignatureFile3}
          />
        </Suspense>
      )}
      {showStaticSignature4CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature4CropModal}
            setShowCropModal={setShowStaticSignature4CropModal}
            imgSrc={signatureFile4}
            setCroppedImage={setSignatureFile4}
          />
        </Suspense>
      )}
      {showStaticSignature5CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature5CropModal}
            setShowCropModal={setShowStaticSignature5CropModal}
            imgSrc={signatureFile5}
            setCroppedImage={setSignatureFile5}
          />
        </Suspense>
      )}
      {showStaticSignature6CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature6CropModal}
            setShowCropModal={setShowStaticSignature6CropModal}
            imgSrc={signatureFile6}
            setCroppedImage={setSignatureFile6}
          />
        </Suspense>
      )} */}
    </>
  );
};

export default SidebarEdit;
