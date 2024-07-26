import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaFingerprint, FaSignature } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Tippy from "@tippyjs/react";
import bankLogo from "../../assets/logo.png";

import "./cheque.css";

import Loader from "../../component/Loader";
import TextError from "../../component/TextError";
import { errorFunction } from "../../component/Alert";
import {
  verifyFingerprint,
  verifySignature,
} from "../../Redux/Registration/thunk";

import { imageConvertor } from "../../utils/imageConvertor";
import PlaceFingerprint from "./PlaceFingerprint";

const FingerprintChequeModal = lazy(() =>
  import("../../Modal/FingerprintChequeModal")
);
const ResponseModal = lazy(() => import("../../Modal/ResonseModal"));

const ChequeRequest = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();
  const loadingVerifyFingerprint = useSelector(
    (state) => state.registration.loadingVerifyFingerprint
  );
  const loadingVerifySignature = useSelector(
    (state) => state.registration.loadingVerifySignature
  );
  const response = useSelector((state) => state.registration.responseText);

  const [signatures, setSignatures] = useState([""]);
  const [signaturesText, setSignaturesText] = useState([""]);
  const [fingerprint, setFingerprint] = useState("");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showFingerPrintModal, setShowFingerPrintModal] = useState(false);
  const [lock, setLock] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    registrationNo: "",
    chequeLeaves: "",
  };

  const validationSchema = Yup.object().shape({
    registrationNo: Yup.string().required("Required"),
    chequeLeaves: Yup.string().required("Required"),
  });

  // useEffect(() => {
  //   window.startSignatureService();
  // }, []);

  // const handleClose = () => {
  //   setSignatures([""]);
  //   setSignaturesText([""]);
  //   setShowModal(false);
  // };

  // const handleSignatureCapture = (pos) => {
  //   window.captureSignature(
  //     signatures,
  //     setSignatures,
  //     signaturesText,
  //     setSignaturesText,
  //     pos
  //   );
  // };

  // const handleSignatureClear = async () => {
  //   setSignatures([""]);
  //   setSignaturesText([""]);
  // };

  // const handleSignatureModal = (data) => {
  //   const { accountApplicationId, chequeLeaves } = data;
  //   if (accountApplicationId === "" || chequeLeaves === "") {
  //     errorFunction("Please fill the form!");
  //   } else {
  //     setShowFingerPrintModal(false);
  //     setShowSignatureModal(true);
  //   }
  // };

  // const handleFingerprintModal = (data) => {
  //   const { accountApplicationId, chequeLeaves } = data;
  //   if (accountApplicationId === "" || chequeLeaves === "") {
  //     errorFunction("Please fill the form! ");
  //   } else {
  //     setShowSignatureModal(false);
  //     setShowFingerPrintModal(true);
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

  return (
    <>
      {(loadingVerifyFingerprint || loadingVerifySignature) && <Loader />}

      <div className="m-auto cheque-wrapper" style={{ minHeight: "100vh" }}>
        <div className="note">
          <Link to="/">
            <img src={bankLogo} alt="logo" />
          </Link>
          <i>Note: This process can also be done via signature.</i>
        </div>
        <div
          className="form-wrapper my-auto shadow-lg py-5 px-5 "
          style={{ borderRadius: "10px" }}
        >
          <h4 className="mb-4 fw-bold ">Online Cheque Request Form</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form autoComplete="off">
                  <div className="form-group">
                    <label htmlFor="registrationNo">Registration Number*</label>
                    <Field
                      type="text"
                      name="registrationNo"
                      placeholder="Registration Number"
                      style={{ fontSize: "1rem" }}
                    />
                    <ErrorMessage name="registrationNo" component={TextError} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="chequeLeaves">
                      Number of cheques Leaves
                    </label>
                    <div>
                      <select
                        style={{ fontSize: "1rem" }}
                        name="chequeLeaves"
                        value={formik.values.chequeLeaves}
                        onChange={(e) =>
                          formik.setFieldValue("chequeLeaves", e.target.value)
                        }
                      >
                        <option value="0">Number of cheques</option>
                        <option value="1">10</option>
                        <option value="2">15</option>
                        <option value="3">20</option>
                      </select>
                      <ErrorMessage name="chequeLeaves" component={TextError} />
                    </div>
                  </div>

                  <div className="mt-5">
                    <PlaceFingerprint
                      fingerprint={fingerprint}
                      setFingerprint={setFingerprint}
                    />
                  </div>

                  <div className="modal-footer flex justify-content-center ">
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
            setShowParentModal={setShowModal}
          />
        </Suspense>
      )} */}
    </>
  );
};

export default ChequeRequest;
