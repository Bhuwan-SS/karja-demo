import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import "./modal.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Tippy from "@tippyjs/react";
import { FaFingerprint, FaSignature } from "react-icons/fa";
import TextError from "../component/TextError";
import {
  verifyFingerprint,
  verifySignature,
} from "../Redux/Registration/thunk";
import { useDispatch, useSelector } from "react-redux";
import { errorFunction } from "../component/Alert";
import Loader from "../component/Loader";
import { imageConvertor } from "../utils/imageConvertor";

const FingerprintChequeModal = lazy(() => import("./FingerprintChequeModal"));
const ResponseModal = lazy(() => import("./ResonseModal"));

const ChequeModal = ({ showModal, setShowModal }) => {
  const [signatures, setSignatures] = useState([""]);
  const [signaturesText, setSignaturesText] = useState([""]);
  const [fingerprint, setFingerprint] = useState("");

  const loadingVerifyFingerprint = useSelector(
    (state) => state.registration.loadingVerifyFingerprint
  );
  const loadingVerifySignature = useSelector(
    (state) => state.registration.loadingVerifySignature
  );
  const response = useSelector((state) => state.registration.responseText);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showFingerPrintModal, setShowFingerPrintModal] = useState(false);
  const [lock, setLock] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const modalClass = showModal ? "modal display-block" : "modal display-none";
  const initialValues = {
    accountNo: "",
    chequeLeaves: "",
  };
  //validation rule htmlFor the form field in formik
  const validationSchema = Yup.object().shape({
    accountNo: Yup.string().required("Required"),
    chequeLeaves: Yup.string().required("Required"),
  });
  //submit handler htmlFor formik
  const onSubmit = async (values, { resetForm }) => {
    console.log("asd");
    const { accountNo } = values;
    // setShowResponseModal(true);

    // const testSignatureFile = signatures[0]
    //   ? await imageConvertor(signatures[0], "signatureFile1.png", "image/png")
    //   : null;

    if (signatures[0] === "" && fingerprint === "") {
      if (signatures[0] === "") {
        errorFunction("Please provide signature!");
        setLock(false);
      } else {
        errorFunction("Please provide fingerprint!");
      }
    } else {
      if (fingerprint !== "") {
        setLock(true);
        console.log("finger");
        const data = {
          ...values,
          accountNo,
          testFingerPrintText: fingerprint,
        };
        const result = await dispatch(verifyFingerprint(data));
        if (result) {
          setLock(false);
          setSignatures([""]);
          setSignaturesText([""]);
          setFingerprint("");
          resetForm();
          setSuccess(true);
          setShowResponseModal(true);
        } else {
          setSuccess(false);
          setLock(false);
          setShowResponseModal(true);
        }
      } else {
        setLock(true);
        const data = {
          ...values,
          accountNo,
        };
        const result = await dispatch(verifySignature(data));
        if (result) {
          setLock(false);
          setSignatures([""]);
          setSignaturesText([""]);
          setFingerprint("");
          resetForm();
          setSuccess(true);
          setShowResponseModal(true);
        } else {
          setSuccess(false);
          setLock(false);
          setShowResponseModal(true);
        }
      }
    }
  };
  useEffect(() => {
    window.startSignatureService();
  }, []);

  const handleClose = () => {
    setSignatures([""]);
    setSignaturesText([""]);
    setShowModal(false);
  };

  const handleSignatureCapture = (pos) => {
    window.captureSignature(
      signatures,
      setSignatures,
      signaturesText,
      setSignaturesText,
      pos
    );
  };
  const handleSignatureClear = async () => {
    setSignatures([""]);
    setSignaturesText([""]);
  };

  const handleSignatureModal = (data) => {
    const { accountApplicationId, chequeLeaves } = data;
    if (accountApplicationId === "" || chequeLeaves === "") {
      errorFunction("Please fill the form!");
    } else {
      setShowFingerPrintModal(false);
      setShowSignatureModal(true);
    }
  };
  const handleFingerprintModal = (data) => {
    const { accountApplicationId, chequeLeaves } = data;
    if (accountApplicationId === "" || chequeLeaves === "") {
      errorFunction("Please fill the form! ");
    } else {
      setShowSignatureModal(false);
      setShowFingerPrintModal(true);
    }
  };

  return (
    // <!-- Log-In-modal-form -->
    <>
      {(loadingVerifyFingerprint || loadingVerifySignature) && <Loader />}
      <div className={modalClass} id="popUpChequeWindow">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- header --> */}
            <div className="modal-header">
              <button type="button" className="close" onClick={handleClose}>
                &times;
              </button>
              <div className="modal-head">
                <h1 className="modal-title">Request Cheque Book</h1>
              </div>
            </div>
            {/* <!-- body --> */}
            <div className="modal-body">
              <div className="form-wrapper">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form autoComplete="off">
                        <div className="form-group">
                          <label htmlFor="accountNo">Account Number*</label>
                          <Field
                            type="text"
                            name="accountNo"
                            placeholder="Account Number"
                          />
                          <ErrorMessage
                            name="accountNo"
                            component={TextError}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="chequeLeaves">
                            Number of cheques Leaves
                          </label>
                          <div>
                            <select
                              name="chequeLeaves"
                              value={formik.values.chequeLeaves}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "chequeLeaves",
                                  e.target.value
                                )
                              }
                            >
                              <option value="0">Number of cheques</option>
                              <option value="1">10</option>
                              <option value="2">15</option>
                              <option value="3">20</option>
                            </select>
                            <ErrorMessage
                              name="chequeLeaves"
                              component={TextError}
                            />
                          </div>
                        </div>
                        {showFingerPrintModal && (
                          <FingerprintChequeModal
                            setShowFingerPrintModal={setShowFingerPrintModal}
                            fingerprint={fingerprint}
                            setFingerprint={setFingerprint}
                            setShowSignatureModal={setShowSignatureModal}
                          />
                        )}
                        {showSignatureModal && (
                          <div className="form-group ">
                            <div className="d-flex justify-content-between align-items-center w-100 my-2 px-3">
                              <h4 className="text-center">Signature</h4>
                              <Tippy content="Fingerprint">
                                <button
                                  type="button"
                                  className="btn btn-success btn-sm"
                                  onClick={() => {
                                    setSignatures([""]);
                                    setSignaturesText([""]);
                                    setShowSignatureModal(false);
                                    setShowFingerPrintModal(true);
                                  }}
                                >
                                  <i>
                                    <FaFingerprint />
                                  </i>
                                </button>
                              </Tippy>
                            </div>
                            <div
                              className=" boxed"
                              style={{
                                height: "202px",
                                width: "402px",
                                border: "1px solid #ddd",
                                margin: "auto",
                                display: "block",
                              }}
                            >
                              {signatures[0] !== "" && (
                                <img src={signatures[0]} alt="signature" />
                              )}
                            </div>
                            <div className="d-flex justify-content-center align-items-center my-2">
                              <button
                                type="button"
                                className="btn btn-success btn-md mr-2"
                                onClick={() => handleSignatureCapture(0)}
                              >
                                Capture
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger btn-md "
                                onClick={() => handleSignatureClear()}
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        )}
                        {!showFingerPrintModal && !showSignatureModal && (
                          <div className="form-group my-4">
                            <h4 className="text-center">Verify with </h4>
                            <div className="d-flex justify-content-center align-items-center my-2">
                              <Tippy content="Signature">
                                <button
                                  type="button"
                                  className="btn btn-success btn-lg mr-2"
                                  disabled={
                                    showSignatureModal || signatures[0] !== ""
                                  }
                                  onClick={() =>
                                    handleSignatureModal(formik.values)
                                  }
                                >
                                  <i>
                                    <FaSignature />
                                  </i>
                                </button>
                              </Tippy>
                              <Tippy content="Fingerprint">
                                <button
                                  type="button"
                                  className="btn btn-success btn-lg"
                                  disabled={
                                    showFingerPrintModal || fingerprint !== ""
                                  }
                                  onClick={() =>
                                    handleFingerprintModal(formik.values)
                                  }
                                >
                                  <i>
                                    <FaFingerprint />
                                  </i>
                                </button>
                              </Tippy>
                            </div>
                          </div>
                        )}

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
            {/* <!-- footer --> */}
          </div>
        </div>
      </div>
     
      {showResponseModal && (
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
      )}
    </>
  );
};

export default ChequeModal;
