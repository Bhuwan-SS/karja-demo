import React, { lazy, useEffect, useState } from "react";
import bankLogo from "../../assets/logo.png";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import "../../Modal/modal.css";
import "../../css/createAccount.css";
import { imageConvertor } from "../../utils/imageConvertor";
import { useHistory, Link } from "react-router-dom";
import { enroll, enrollAccountForm } from "../../Redux/Auth/thunk";
import Signature from "./Signature";
import Photo from "./Photo";
import "./account.css";
import TextField from "../../component/CommonTextField/TextField";
import { AsyncPaginate } from "react-select-async-paginate";
import Modal from "../../component/Modal/Modal";
import PlaceFingerprint from "./PlaceFingerprint";
import axiosInstance from "../../utils/axios";
import Loader from "../../component/Loader";
import { dateFormater } from "../../utils/dateFormater";
import { successFunction } from "../../component/Alert";

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

const CreateAccountForm = () => {
  const history = useHistory();
  const [clearCache, setClearCache] = useState(false);
  const [signatures, setSignatures] = useState(["", ""]);
  const [signaturesText, setSignaturesText] = useState(["", ""]);
  const [photo, setPhoto] = useState("");
  const [leftFingerprint, setLeftFingerprint] = useState("");
  const [rightFingerprint, setRightFingerprint] = useState("");
  const [value, setValue] = useState(0);
  const [photoError, setPhotoError] = useState(false);
  const [fingerprintError, setFingerprintError] = useState(false);
  const [signatureError, setSignatureError] = useState(false);
  const [documentError, setDocumentError] = useState(false);
  const [goingBack, setGoingBack] = useState(false);
  const [showIframeModal, setShowIframeModal] = useState(false);

  const loading = useSelector((state) => state.auth.loading);

  const steps = [
    { label: "Bank" },
    { label: "Basic Details" },
    { label: "Biometrics" },
  ];
  const initialValues = {
    bank: null,
    name: "",
    documentId: "",
    dateOfBirth: "",
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
    bank: Yup.object().required("Required!").typeError("Required!"),
    name: Yup.string().required("Required!"),
    dateOfBirth: Yup.date().required("Required!"),
    documentId: Yup.string().required("Required!"),
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

  const handleSubmit = async (values, resetForm) => {
    const {
      bank,
      name,
      documentId,
      dateOfBirth,
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
    const enrollData = {
      bankCode: bank?.bankCode,
      name,
      dateOfBirth: dateFormater(dateOfBirth),
      documentId,
      fatherName,
      motherName,
      contact,
      wardNoId: ward?.id,
      provinceId: province?.id,
      districtId: district?.id,
      localLevelId: palika?.id,
      tole,
      photo: userPhoto,
      leftFingerPrintText: leftFingerprint,
      rightFingerPrintText: rightFingerprint,
      staticSignature1: signatures[0],
      staticSignature2: signatures[1],
    };
    const result = await dispatch(enrollAccountForm(enrollData));
    if (result) {
      successFunction("Account created successfully.");
      setValue(0);
      resetForm();
      setPhoto("");
      setLeftFingerprint("");
      setRightFingerprint("");
      setSignatures(["", ""]);
      setSignaturesText(["", ""]);
      setPhotoError(false);
      setFingerprintError(false);
      setSignatureError(false);
    }
  };

  const handleMenuOpen = () => {
    setClearCache(true);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      // Check the origin of the incoming message
      if (event.origin !== "http://localhost:3001") {
        return;
      }
      if (event.data) {
        const data = JSON.parse(event.data);
        if (data !== null) {
          setPhoto(data?.photo);
          setLeftFingerprint(data?.leftFingerprint);
          setRightFingerprint(data?.rightFingerprint);
          setSignatures(data?.signatures);
          setSignaturesText(data?.signaturesText);
        }
        setShowIframeModal(false);
      }
    };

    // Add event listener
    window.addEventListener("message", handleMessage);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const loadBank = async (search, loadOptions) => {
    const { data } = await axiosInstance(
      `api/v1/bank-app/get-bank?search=${search}`
    );
    return {
      options: data?.content,
    };
  };
  const loadProvince = async (search, loadOptions) => {
    const { data } = await axiosInstance(
      `api/v1/province-app?search=${search}`
    );
    return {
      options: data?.content,
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
      options: data?.content,
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
      options: data?.content,
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
      options: data?.content,
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
      if (formik.values.bank === null) {
        formik.setFieldTouched("bank", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 1) {
      if (
        formik.values.name === "" ||
        formik.values.contact === "" ||
        formik.values.fatherName === "" ||
        formik.values.motherName === "" ||
        formik.values.province === null ||
        formik.values.district === null ||
        formik.values.palika === null ||
        formik.values.ward === null ||
        formik.values.tole === ""
      ) {
        formik.setFieldTouched("name", true);
        formik.setFieldTouched("contact", true);
        formik.setFieldTouched("fatherName", true);
        formik.setFieldTouched("motherName", true);
        formik.setFieldTouched("province", true);
        formik.setFieldTouched("district", true);
        formik.setFieldTouched("palika", true);
        formik.setFieldTouched("ward", true);
        formik.setFieldTouched("tole", true);
      } else {
        setValue(value + 1);
      }
    } else if (value === 3) {
      if (
        photo === "" ||
        leftFingerprint === "" ||
        rightFingerprint === "" ||
        signatures[0] === "" ||
        signatures[1] === ""
      ) {
        setPhotoError(true);
        setFingerprintError(true);
        setSignatureError(true);
      } else {
        if (photoError) {
          setPhotoError(false);
        }
        if (fingerprintError) {
          setFingerprintError(false);
        }
        if (signatureError) {
          setSignatureError(false);
        }
        setValue(value + 1);
      }
    } else {
      setValue(value + 1);
    }
  };

  const handlePrevious = () => {
    if (value === 3) {
      if (leftFingerprint === "" || rightFingerprint === "") {
        setGoingBack(true);
      } else {
        setValue(value - 1);
      }
    } else {
      setValue(value - 1);
    }
  };

  const disableSaveButton = () => {
    if (
      photo === "" ||
      leftFingerprint === "" ||
      rightFingerprint === "" ||
      signatures?.find((sign) => sign === "")
    ) {
      return true;
    } else {
      return false;
    }
  };

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
              return (
                <React.Fragment key={index}>
                  <div className="stepper-wrapper">
                    <Stepper
                      step={value}
                      index={index} // Adjusting index to start from 1
                      label={step.label}
                      onClick={() => ""}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form autoComplete="off" className="kyc-form">
                  {value === 0 ? (
                    <div className="d-flex  flex-column align-items-center">
                      <div className=" form-group form-wrapper p-4">
                        <label
                          htmlFor="bank "
                          className="m-0 form-label text-left"
                        >
                          Bank<strong className="text-danger">*</strong>
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          className="common-async-select-wrapper"
                          name="bank"
                          getOptionLabel={(option) => `${option.name}`}
                          getOptionValue={(option) => `${option?.id}`}
                          value={formik.values.bank}
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[value, clearCache]}
                          onChange={(selected) => {
                            formik.setFieldValue("bank", selected);
                          }}
                          isClearable="true"
                          isSearchable="true"
                          loadOptions={loadBank}
                          additional={{
                            offset: 0,
                            limit: 10,
                          }}
                        />
                        <ErrorMessage
                          name="bank"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  ) : value === 1 ? (
                    <div className="row">
                      <div className="col-3 my-2">
                        <TextField
                          type="text"
                          name="name"
                          label="Name"
                          autoFocus={true}
                          required={true}
                          formikRequired={
                            formik?.errors?.name && formik?.touched?.name
                          }
                          onChange={(e) => {
                            formik.setFieldValue("name", e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-3 my-2">
                        <TextField
                          type="text"
                          name="documentId"
                          label="Document ID"
                          required={true}
                          formikRequired={
                            formik?.errors?.documentId &&
                            formik?.touched?.documentId
                          }
                          onChange={(e) => {
                            formik.setFieldValue("documentId", e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-3 my-2 date-picker-wrapper">
                        <label
                          htmlFor="dateOfBirth"
                          className="m-0 form-label text-left"
                        >
                          Date of Birth
                          <strong className="text-danger">*</strong>
                        </label>
                        <br />
                        <DatePicker
                          name="dateOfBirth"
                          id="dateOfBirth"
                          selected={formik.values.dateOfBirth}
                          showMonthDropdown
                          showYearDropdown
                          maxDate={new Date()}
                          className="form-control"
                          placeholderText="Select..."
                          dateFormat="yyyy-MM-dd"
                          onChange={(date) => {
                            formik.setFieldValue("dateOfBirth", date);
                          }}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-3 my-2">
                        <TextField
                          type="number"
                          name="contact"
                          label="Mobile No"
                          required={true}
                          formikRequired={
                            formik?.errors?.contact && formik?.touched?.contact
                          }
                          onChange={(e) => {
                            formik.setFieldValue("contact", e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-3 my-2">
                        <TextField
                          type="text"
                          name="fatherName"
                          label="Father Name"
                          required={true}
                          formikRequired={
                            formik?.errors?.fatherName &&
                            formik?.touched?.fatherName
                          }
                          onChange={(e) => {
                            formik.setFieldValue("fatherName", e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-3 my-2">
                        <TextField
                          type="text"
                          name="motherName"
                          label="Mother Name"
                          required={true}
                          formikRequired={
                            formik?.errors?.motherName &&
                            formik?.touched?.motherName
                          }
                          onChange={(e) => {
                            formik.setFieldValue("motherName", e.target.value);
                          }}
                        />
                      </div>

                      <div className="col-3 my-2">
                        <label
                          htmlFor="province "
                          className="m-0 form-label text-left"
                        >
                          Province<strong className="text-danger">*</strong>
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
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
                        <ErrorMessage
                          name="province"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-3 my-2">
                        <label
                          htmlFor="district"
                          className="m-0 form-label text-left"
                        >
                          District<strong className="text-danger">*</strong>
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          name="district"
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[
                            value,
                            formik.values.province,
                            clearCache,
                          ]}
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
                        <ErrorMessage
                          name="district"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-3 my-2">
                        <label
                          htmlFor="palika"
                          className="m-0 form-label text-left"
                        >
                          Palika<strong className="text-danger">*</strong>
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          name="palika"
                          isMulti={false}
                          getOptionLabel={(option) =>
                            `${option.localLevelName}`
                          }
                          getOptionValue={(option) => `${option?.id}`}
                          value={formik.values.palika}
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[
                            value,
                            formik.values.district,
                            clearCache,
                          ]}
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
                        <ErrorMessage
                          name="palika"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-3 my-2">
                        <label
                          htmlFor="ward"
                          className="m-0 form-label text-left"
                        >
                          Ward<strong className="text-danger">*</strong>
                        </label>
                        <AsyncPaginate
                          styles={customStyles}
                          name="ward"
                          isDisabled={formik.values.palika === null}
                          isMulti={false}
                          onMenuOpen={handleMenuOpen}
                          cacheUniqs={[value, formik.values.palika, clearCache]}
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
                        <ErrorMessage
                          name="ward"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-3 my-2">
                        <TextField
                          type="text"
                          name="tole"
                          label="Tole"
                          required={true}
                          formikRequired={
                            formik?.errors?.tole && formik?.touched?.tole
                          }
                          onChange={(e) => {
                            formik.setFieldValue("tole", e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  ) : value === 2 ? (
                    <div className="account-form-biometrics-container">
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <Photo
                          photoError={photoError}
                          photo={photo}
                          setPhoto={setPhoto}
                          type="accountForm"
                        />
                        <PlaceFingerprint
                          leftFingerprint={leftFingerprint}
                          setLeftFingerprint={setLeftFingerprint}
                          rightFingerprint={rightFingerprint}
                          setRightFingerprint={setRightFingerprint}
                          fingerprintError={fingerprintError}
                          goingBack={goingBack}
                          setGoingBack={setGoingBack}
                          setValue={setValue}
                          type="accountForm"
                        />
                        <Signature
                          signatures={signatures}
                          signatureError={signatureError}
                          handleSignatureCapture={handleSignatureCapture}
                          handleSignatureClear={handleSignatureClear}
                          type="accountForm"
                        />
                        <button
                          type="button"
                          className="btn btn-md btn-secondary"
                          onClick={() => setShowIframeModal(true)}
                        >
                          Capture
                        </button>
                      </div>
                    </div>
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
                    {value === 2 ? (
                      <button
                        type="button"
                        className="btn-next"
                        disabled={disableSaveButton() || loading}
                        onClick={() =>
                          handleSubmit(formik?.values, formik.resetForm)
                        }
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
      {showIframeModal && (
        <Modal
          header={"Biometrics"}
          size={"modal-xl"}
          showModal={showIframeModal}
          setShowModal={setShowIframeModal}
          type="accountForm"
        >
          <iframe
            src={`http://localhost:3001/enroll?origin=http://localhost:3000`}
            width="100%"
            height="760px"
            id="biometrics-iframe"
            title="Verify"
            allow="camera; microphone"
          />
        </Modal>
      )}
    </>
  );
};

export default CreateAccountForm;
