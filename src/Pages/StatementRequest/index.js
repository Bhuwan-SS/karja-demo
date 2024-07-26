import React, { useEffect, useState, Suspense, lazy } from "react";
import "./request.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { FaSignature, FaFingerprint } from "react-icons/fa";
import TextError from "../../component/TextError";
import DatePicker from "react-datepicker";
import bankLogo from "../../assets/logo.png";
import { dateFormater } from "../../utils/dateFormater";
import { useDispatch, useSelector } from "react-redux";
import {
  verifySignature,
  verifyFingerprint,
} from "../../Redux/Registration/thunk";
import { errorFunction } from "../../component/Alert";
import Loader from "../../component/Loader";
import PlaceFingerprint from "./PlaceFingerprint";

const FingerprintChequeModal = lazy(() =>
  import("../../Modal/FingerprintChequeModal")
);
const ResponseModal = lazy(() => import("../../Modal/ResonseModal"));

const StatementRequest = () => {
  const [signatures, setSignatures] = useState([""]);
  const [fingerprint, setFingerprint] = useState("");
  const [fingerprintError, setFingerprintError] = useState(false);
  const [signaturesText, setSignaturesText] = useState([""]);
  const loadingVerifyFingerprint = useSelector(
    (state) => state.registration.loadingVerifyFingerprint
  );
  const loadingVerifySignature = useSelector(
    (state) => state.registration.loadingVerifySignature
  );
  const response = useSelector((state) => state.registration.responseText);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showFingerPrintModal, setShowFingerPrintModal] = useState(false);
  const dispatch = useDispatch();
  const [lock, setLock] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    registrationNo: "",
    startDate: "",
    endDate: "",
  };
  //validation rule htmlFor the form field in formik
  const validationSchema = Yup.object().shape({
    registrationNo: Yup.string().required("Required"),
    startDate: Yup.date().required("Required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date should be greater")
      .required("Required"),
  });

  //submit handler htmlFor formik
  // const onSubmit = async (values, { resetForm }) => {
  //   const { registrationNo } = values;
  //   const startDate = dateFormater(values.startDate);
  //   const endDate = dateFormater(values.endDate);
  //   if (signatures[0] === "" && fingerprint === "") {
  //     if (signatures[0] === "") {
  //       errorFunction("Please provide signature!");
  //       setLock(false);
  //     } else {
  //       errorFunction("Please provide fingerprint!");
  //     }
  //   } else {
  //     if (fingerprint !== "") {
  //       setLock(true);
  //       console.log("finger");
  //       const data = {
  //         ...values,
  //         registrationNo,
  //         testFingerPrintText: fingerprint,
  //       };
  //       const result = await dispatch(verifyFingerprint(data));
  //       if (result) {
  //         setLock(false);
  //         setSignatures([""]);
  //         setSignaturesText([""]);
  //         setFingerprint("");
  //         resetForm();
  //         setSuccess(true);
  //         setShowResponseModal(true);
  //       } else {
  //         setSuccess(false);
  //         setLock(false);
  //         setShowResponseModal(true);
  //       }
  //     } else {
  //       setLock(true);
  //       const data = {
  //         ...values,
  //         registrationNo,
  //       };
  //       const result = await dispatch(verifySignature(data));
  //       if (result) {
  //         setLock(false);
  //         setSignatures([""]);
  //         setSignaturesText([""]);
  //         setFingerprint("");
  //         resetForm();
  //         setSuccess(true);
  //         setShowResponseModal(true);
  //       } else {
  //         setSuccess(false);
  //         setLock(false);
  //         setShowResponseModal(true);
  //       }
  //     }
  //   }
  // };

  const onSubmit = async (values, { resetForm }) => {
    const { registrationNo } = values;
    if (fingerprint === "") {
      errorFunction("Please provide fingerprint!");
    } else {
      const verifyData = {
        registrationNo,
        testFingerPrintText: fingerprint,
      };
      const result = await dispatch(verifyFingerprint(verifyData));
      if (result) {
        resetForm();
        setFingerprint("");
      }
    }
  };

  // useEffect(() => {
  //   window.startSignatureService();
  // }, []);
  // const handleClose = () => {
  //   setSignatures([""]);
  //   setSignaturesText([""]);
  // };

  return (
    <>
      {(loadingVerifyFingerprint || loadingVerifySignature) && <Loader />}

      <div className="m-auto request-wrapper" style={{ minHeight: "100vh" }}>
        <div className="note">
          <Link to="/">
            <img src={bankLogo} alt="logo" />
          </Link>
          <i>Note: This process can also be done via signature.</i>
        </div>
        <div
          className="form-wrapper my-auto shadow-lg py-5 px-5"
          style={{ borderRadius: "10px" }}
        >
          <h4 className="mb-4 fw-bold ">Request Account Statement</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="number">Registration Number*</label>
                    <Field
                      type="text"
                      name="registrationNo"
                      placeholder="Registration Number"
                    />
                    <ErrorMessage name="registrationNo" component={TextError} />
                  </div>

                  <div className="date ">
                    <div className="form-group">
                      <label htmlFor="startDate">Start Date:</label>
                      <DatePicker
                        name="dob"
                        selected={formik.values.startDate}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="yyyy/MM/dd"
                        placeholderText="YYYY-MM-DD"
                        dropdownMode="select"
                        className="form-control"
                        onChange={(date) => {
                          formik.setFieldValue("startDate", date);
                        }}
                      />
                      <ErrorMessage name="startDate" component={TextError} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endDate">End Date:</label>
                      <DatePicker
                        name="dob"
                        selected={formik.values.endDate}
                        showMonthDropdown
                        showYearDropdown
                        dateFormat="yyyy/MM/dd"
                        placeholderText="YYYY-MM-DD"
                        dropdownMode="select"
                        className="form-control"
                        onChange={(date) => {
                          formik.setFieldValue("endDate", date);
                        }}
                      />
                      <ErrorMessage name="endDate" component={TextError} />
                    </div>
                  </div>
                  <div className="mt-5">
                    <PlaceFingerprint
                      fingerprintError={fingerprintError}
                      fingerprint={fingerprint}
                      setFingerprint={setFingerprint}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn" disabled={lock}>
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>

      {/* {showResponseModal && (
        <Suspense fallback={<></>}>
          <ResponseModal
            showModal={showResponseModal}
            setShowModal={setShowResponseModal}
            size="modal-md"
            success={success}
            responseText={response}
          />
        </Suspense>
      )} */}
    </>
  );
};

export default StatementRequest;
