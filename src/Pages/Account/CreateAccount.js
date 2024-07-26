import React, { useEffect, useState } from "react";
import bankLogo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import "../../Modal/modal.css";
import "../../css/createAccount.css";
import { imageConvertor } from "../../utils/imageConvertor";
import { useHistory, Link } from "react-router-dom";
import { enroll } from "../../Redux/Auth/thunk";
import Signature from "./Signature";
import Document from "./Document";
import Photo from "./Photo";
import "./account.css";
import TextField from "../../component/CommonTextField/TextField";
import { AsyncPaginate } from "react-select-async-paginate";
import Modal from "../../component/Modal/Modal";
import PlaceFingerprint from "./PlaceFingerprint";
import axiosInstance from "../../utils/axios";
import AccountPDF from "./AccountPdf/AccountPDF";
import { base64ToFile } from "../../utils/base64ToFile";
import Loader from "../../component/Loader";
const Stepper = ({ step, index, label, onClick }) => {
  return (
    <>
      <button
        className={`stepper-tab ${
          step > index ? "bg-success" : step === index ? "bg-danger" : "bg-dark"
        }`}
        onClick={() => onClick(index)}
      ></button>
      <div>{label}</div>
    </>
  );
};
const CreateAccount = () => {
  const history = useHistory();
  const [clearCache, setClearCache] = useState(false);
  const [signatures, setSignatures] = useState(["", ""]);
  const [signaturesText, setSignaturesText] = useState(["", ""]);
  const [photo, setPhoto] = useState("");
  const [leftFingerprint, setLeftFingerprint] = useState("");
  const [rightFingerprint, setRightFingerprint] = useState("");
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [fingerprintError, setFingerprintError] = useState(false);
  const [signatureError, setSignatureError] = useState(false);
  const [documentError, setDocumentError] = useState(false);
  const [goingBack, setGoingBack] = useState(false);
  const [documentType, setDocumentType] = useState(null);
  const [documentFront, setDocumentFront] = useState("");
  const [documentBack, setDocumentBack] = useState("");

  const loading = useSelector((state) => state.auth.loading);
  const steps = [
    { label: "Basic Details" },
    { label: "Photo" },
    { label: "Fingerprints" },
    { label: "Signature" },
    { label: "Documents" },
  ];
  const initialValues = {
    fullName: "",
    fatherName: "",
    motherName: "",
    contact: "",
    province: null,
    district: null,
    palika: null,
    ward: null,
    tole: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Required!"),
    fatherName: Yup.string().required("Required!"),
    motherName: Yup.string().required("Required!"),
    contact: Yup.string().required("Required!"),
    province: Yup.object().nullable(false).typeError("Required!"),
    district: Yup.object().nullable(true),
    palika: Yup.object().nullable(false).typeError("Required!"),
    ward: Yup.object().nullable(false).typeError("Required!"),
    tole: Yup.string().required("Required!"),
  });
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "100%",
      minHeight: "43px",
      borderColor: "#aaa1a1",
      backgroundColor: state.isDisabled ? "#00000" : "#ffffff",
    }),
  };
  const dispatch = useDispatch();

  const handleSignatureCapture = (pos) => {
    window.captureSignature(
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

  const onSubmit = async (values) => {
    const {
      fullName,
      fatherName,
      motherName,
      contact,
      province,
      district,
      palika,
      ward,
      tole,
    } = values;
    const userPhoto = await imageConvertor(photo, "photo.png", "image/png");
    const userDocumentFront = await base64ToFile(documentFront);
    const userDocumentBack = await base64ToFile(documentBack);
    const enrollData = {
      fullName,
      fatherName,
      motherName,
      contact,
      provinceId: province?.id,
      districtId: district?.id,
      localLevelId: palika?.id,
      wardNoId: ward?.id,
      tole,
      photo: userPhoto,
      leftFingerprintText: leftFingerprint,
      rightFingerprintText: rightFingerprint,
      staticSignature1: signatures[0],
      staticSignature2: signatures[1],
      fssSignature1: signaturesText[0],
      fssSignature2: signaturesText[1],
      documentType: documentType?.id,
      documentFront: userDocumentFront,
      documentBack: userDocumentBack,
    };
    const result = await dispatch(enroll(enrollData));
    if (result) {
      setShowModal(true);
    }
  };

  const handleMenuOpen = () => {
    setClearCache(true);
  };

  const loadProvince = async (search, loadOptions) => {
    const { data } = await axiosInstance(
      `api/v1/province-app?search=${search}`
    );
    return {
      options: data,
    };
  };

  const loadDistrict = async (
    search,
    loadOptions,
    { limit, offset, province }
  ) => {
    const { data } = await axiosInstance(
      `api/v1/district-app?provinceId=${province}&search=${search}&offset=${offset}&limit=${limit}`
    );
    return {
      options: data.content,
      hasMore: data.empty ? false : true,
      additional: {
        offset: data.totalElements > offset ? offset + 10 : offset,
        limit: 10,
        province: province,
      },
    };
  };
  const loadPalika = async (
    search,
    loadOptions,
    { limit, offset, district }
  ) => {
    const { data } = await axiosInstance(
      `api/v1/local-level-app?districtId=${district}&search=${search}&offset=${offset}&limit=${limit}`
    );
    return {
      options: data.content,
      hasMore: data.empty ? false : true,
      additional: {
        offset: data.totalElements > offset ? offset + 10 : offset,
        limit: 10,
        district: district,
      },
    };
  };
  const loadWard = async (search, loadOptions, { limit, offset, palika }) => {
    const { data } = await axiosInstance(
      `api/v1/ward-app?localLevelId=${palika}&search=${search}&offset=${offset}&limit=${limit}`
    );
    return {
      options: data.content,
      hasMore: data.empty ? false : true,
      additional: {
        offset: data.totalElements > offset ? offset + 10 : offset,
        limit: 10,
        palika: palika,
      },
    };
  };

  const handleCheck = async (formik) => {
    if (value === 0) {
      if (formik.values.fullName === "") {
        formik.setFieldTouched("fullName", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 1) {
      if (formik.values.contact === "") {
        formik.setFieldTouched("contact", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 2) {
      if (formik.values.fatherName === "") {
        formik.setFieldTouched("fatherName", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 3) {
      if (formik.values.motherName === "") {
        formik.setFieldTouched("motherName", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 4) {
      if (formik.values.province === null) {
        formik.setFieldTouched("province", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 5) {
      if (formik.values.district === null) {
        formik.setFieldTouched("district", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 6) {
      if (formik.values.palika === null) {
        formik.setFieldTouched("palika", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 7) {
      if (formik.values.ward === null) {
        formik.setFieldTouched("ward", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 8) {
      if (formik.values.tole === "") {
        formik.setFieldTouched("tole", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 9) {
      if (photo === "") {
        setPhotoError(true);
      } else {
        if (photoError) {
          setPhotoError(false);
        }
        setValue(value + 1);
      }
    } else if (value === 10) {
      if (leftFingerprint === "" || rightFingerprint === "") {
        setFingerprintError(true);
      } else {
        if (fingerprintError) {
          setFingerprintError(false);
        }
        setValue(value + 1);
      }
    } else if (value === 11) {
      if (signatures[0] === "" || signatures[1] === "") {
        setSignatureError(true);
      } else {
        if (signatureError) {
          setSignatureError(false);
        }
        setValue(value + 1);
      }
    } else {
      setValue(value + 1);
    }
  };

  const handleCheckDocument = (formik) => {
    if (documentType === null || documentFront === "" || documentBack === "") {
      setDocumentError(true);
    } else {
      if (documentError) {
        setDocumentError(false);
      }
      formik.submitForm();
    }
  };
  const handlePrevious = () => {
    if (value === 10) {
      if (leftFingerprint === "" || rightFingerprint === "") {
        setGoingBack(true);
      } else {
        setValue(value - 1);
      }
    } else {
      setValue(value - 1);
    }
  };

  // const startScanner = async () => {
  //   const result = await axiosInstance.get(`api/v1/access-app/start-scanner`);
  //   // console.log(result, "res");
  // };
  // useEffect(() => {
  //   startScanner();
  // }, []);

  return (
    <>
      {loading && <Loader />}
      <section className="form-wrapper create-account-wrapper  ">
        <Link to="/">
          <img src={bankLogo} className="logo" width={"160px"} />
        </Link>
        <div className="form-header">
          <h1
            className="text-center mb-4"
            style={{ textTransform: "capitalize" }}
          >
            Account Opening Form
          </h1>
          <div className=" stepper">
            {steps.map((step, index) => {
              // console.log(step, index);
              return (
                <React.Fragment key={index}>
                  <div className="stepper-wrapper">
                    <Stepper
                      step={value < 8 ? 0 : value - 8}
                      index={index} // Adjusting index to start from 1
                      label={step.label}
                      onClick={(stepIndex) => setValue(stepIndex)}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="form">
          <Formik
            // enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form autoComplete="off" className="kyc-form">
                  {value === 0 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <TextField
                          type="text"
                          name="fullName"
                          label="Name"
                          autoFocus={true}
                          formikRequired={
                            formik?.errors?.fullName &&
                            formik?.touched?.fullName
                          }
                          onChange={(e) => {
                            formik.setFieldValue("fullName", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : value === 1 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <TextField
                          type="text"
                          name="contact"
                          label="Mobile No"
                          autoFocus={true}
                          formikRequired={
                            formik?.errors?.contact && formik?.touched?.contact
                          }
                          onChange={(e) => {
                            formik.setFieldValue("contact", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : value === 2 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <TextField
                          type="text"
                          name="fatherName"
                          label="Father Name"
                          autoFocus={true}
                          formikRequired={
                            formik?.errors?.fatherName &&
                            formik?.touched?.fatherName
                          }
                          onChange={(e) => {
                            formik.setFieldValue("fatherName", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : value === 3 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <TextField
                          type="text"
                          name="motherName"
                          autoFocus={true}
                          label="Mother Name"
                          formikRequired={
                            formik?.errors?.motherName &&
                            formik?.touched?.motherName
                          }
                          onChange={(e) => {
                            formik.setFieldValue("motherName", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : value === 4 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <label
                          htmlFor="province "
                          className="m-0 form-label text-left"
                        >
                          Province:
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          className="common-async-select-wrapper"
                          name="province"
                          getOptionLabel={(option) => `${option.provinceName}`}
                          getOptionValue={(option) => `${option?.id}`}
                          value={formik.values.province}
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[value, clearCache]}
                          onChange={(selected) => {
                            formik.setFieldValue("province", selected);
                          }}
                          isClearable="true"
                          isSearchable="true"
                          loadOptions={loadProvince}
                          additional={{
                            offset: 0,
                            limit: 10,
                          }}
                        />
                        <ErrorMessage name="province" component="div" />
                      </div>
                    </div>
                  ) : value === 5 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <label
                          htmlFor="district"
                          className="m-0 form-label text-left"
                        >
                          District
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          className="common-async-select-wrapper"
                          name="district"
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[value, clearCache]}
                          isMulti={false}
                          getOptionLabel={(option) => `${option.districtName}`}
                          getOptionValue={(option) => `${option?.id}`}
                          isDisabled={formik.values.province === null}
                          value={formik.values.district}
                          onChange={(selected) => {
                            formik.setFieldValue("district", selected);
                          }}
                          isClearable="true"
                          isSearchable="true"
                          loadOptions={loadDistrict}
                          additional={{
                            offset: 0,
                            limit: 10,
                            province: formik.values.province?.id,
                          }}
                        />
                        <ErrorMessage name="district" component="div" />
                      </div>
                    </div>
                  ) : value === 6 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <label
                          htmlFor="palika"
                          className="m-0 form-label text-left"
                        >
                          Palika
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          className="common-async-select-wrapper"
                          name="palika"
                          isMulti={false}
                          getOptionLabel={(option) =>
                            `${option.localLevelName}`
                          }
                          getOptionValue={(option) => `${option?.id}`}
                          value={formik.values.palika}
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[value, clearCache]}
                          onChange={(selected) => {
                            formik.setFieldValue("palika", selected);
                          }}
                          isDisabled={formik.values.district === null}
                          isClearable="true"
                          isSearchable="true"
                          loadOptions={loadPalika}
                          additional={{
                            offset: 0,
                            limit: 10,
                            district: formik.values.district?.id,
                          }}
                        />
                        <ErrorMessage name="palika" component="div" />
                      </div>
                    </div>
                  ) : value === 7 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <label
                          htmlFor="ward"
                          className="m-0 form-label text-left"
                        >
                          Ward
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          className="common-async-select-wrapper"
                          name="ward"
                          isDisabled={formik.values.palika === null}
                          isMulti={false}
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[value, clearCache]}
                          value={formik.values.ward}
                          getOptionLabel={(option) => `${option.wardNo}`}
                          getOptionValue={(option) => `${option?.id}`}
                          onChange={(selected) => {
                            formik.setFieldValue("ward", selected);
                          }}
                          isClearable="true"
                          isSearchable="true"
                          loadOptions={loadWard}
                          additional={{
                            offset: 0,
                            limit: 10,
                            palika: formik.values.palika?.id,
                          }}
                        />
                        <ErrorMessage name="ward" component="div" />
                      </div>
                    </div>
                  ) : value === 8 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className="bg-white form-group form-wrapper ">
                        <TextField
                          type="text"
                          name="tole"
                          label="Tole"
                          autoFocus={true}
                          formikRequired={
                            formik?.errors?.tole && formik?.touched?.tole
                          }
                          onChange={(e) => {
                            formik.setFieldValue("tole", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : value === 9 ? (
                    <Photo
                      photoError={photoError}
                      photo={photo}
                      setPhoto={setPhoto}
                    />
                  ) : value === 10 ? (
                    <PlaceFingerprint
                      leftFingerprint={leftFingerprint}
                      setLeftFingerprint={setLeftFingerprint}
                      rightFingerprint={rightFingerprint}
                      setRightFingerprint={setRightFingerprint}
                      fingerprintError={fingerprintError}
                      goingBack={goingBack}
                      setGoingBack={setGoingBack}
                      setValue={setValue}
                    />
                  ) : value === 11 ? (
                    <Signature
                      signatures={signatures}
                      signatureError={signatureError}
                      handleSignatureCapture={handleSignatureCapture}
                      handleSignatureClear={handleSignatureClear}
                    />
                  ) : value === 12 ? (
                    <Document
                      documentType={documentType}
                      setDocumentType={setDocumentType}
                      documentFront={documentFront}
                      setDocumentFront={setDocumentFront}
                      documentBack={documentBack}
                      setDocumentBack={setDocumentBack}
                      documentError={documentError}
                    />
                  ) : (
                    <></>
                  )}
                  <div
                    className={`prev-next-btn-wrapper ${
                      value > 0
                        ? "justify-content-between"
                        : "justify-content-end"
                    } `}
                  >
                    {value > 0 && (
                      <button
                        type="button"
                        className="btn-prev"
                        onClick={() => {
                          handlePrevious(formik);
                        }}
                      >
                        Previous
                      </button>
                    )}
                    {value === 12 ? (
                      <button
                        type="button"
                        className="btn-next"
                        onClick={() => handleCheckDocument(formik)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-next "
                        onClick={() => handleCheck(formik)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
      {showModal && (
        <>
          <Modal
            size={"modal-xl"}
            setShowModal={setShowModal}
            showModal={showModal}
            type="account"
          >
            <AccountPDF showModal={showModal} />
          </Modal>
        </>
      )}
    </>
  );
};

export default CreateAccount;
