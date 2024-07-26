import React, { useState, useEffect } from "react";
import ImageBox from "../../component/ImageBox";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import capture from "../../img/m_header.png";
import "../../Modal/modal.css";
import "../../css/createAccount.css";
import FingerPrint from "../../utils/Fingerprint";
import Modal from "../../component/Modal/Modal";
import CameraModal from "./CameraModal";
import CropModal from "./CropModal";
import { imageConvertor } from "../../utils/imageConvertor";
import { useHistory } from "react-router-dom";
import { updateKYC } from "../../Redux/Auth/thunk";
import {
  getSpecificAccount,
  verifyFingerprint,
} from "../../Redux/Registration/thunk";
import Loader from "../../component/Loader";
import FingerprintChequeModal from "../../Modal/FingerprintChequeModal";
import ResponseModal from "../../Modal/ResonseModal";
import { errorFunction, successFunction } from "../../component/Alert";
import { clearSpecificAccount } from "../../Redux/Registration/action";

const KYCUpdate = () => {
  const history = useHistory();
  const account = useSelector((state) => state.registration.account);
  const loadingAccount = useSelector(
    (state) => state.registration.loadingAccount
  );

  const [accountId, setAccountId] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [signatures, setSignatures] = useState(["", "", "", ""]);
  const [signaturesText, setSignaturesText] = useState(["", "", "", ""]);
  const [photo, setPhoto] = useState("");
  const [leftFingerprint, setLeftFingerprint] = useState("");
  const [rightFingerprint, setRightFingerprint] = useState("");
  const [img, setImg] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [startScan, setStartScan] = useState(false);
  const [finger, setFinger] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showFingerPrintModal, setShowFingerPrintModal] = useState(false);
  const [verifyAccountNoModal, setVerifyAccountNoModal] = useState(false);
  const [fingerprint, setFingerprint] = useState("");
  const [formikValues, setFormikValues] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);

  const types = "capture";
  const initialValues = {
    name: account !== null ? account?.name : "",
    address: account !== null ? account?.address : "",
    phoneNo: account !== null ? account?.phoneNo : "",
  };
  //validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    address: Yup.string(),
    phoneNo: Yup.string().required("Phone number is required"),
  });

  const handleLeftCapture = () => {
    setStartScan(true);
    setFinger("left");
  };
  const handleRightCapture = () => {
    setStartScan(true);
    setFinger("right");
  };

  useEffect(() => {
    if (img !== "" && finger === "left") {
      setLeftFingerprint(img);
    } else if (img !== "" && finger === "right") {
      setRightFingerprint(img);
    }
    setImg("");
    setFinger("");
  }, [img]);

  useEffect(() => {
    if (startScan && leftFingerprint !== "") {
      setStartScan(false);
    } else if (startScan && rightFingerprint !== "") {
      setStartScan(false);
    }
  }, [leftFingerprint, rightFingerprint]);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setVerifyAccountNoModal(true);
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
  useEffect(() => {
    window.startSignatureService();
  }, []);

  const onSubmit = async (values) => {
    console.log("on cubsdi");
    const { name, address, phoneNo } = formikValues;
    const userPhoto = await imageConvertor(photo, "photo.png", "image/png");
    const updateData = {
      id: accountId,
      name,
      address,
      phoneNo,
      deviceId,
      photo: userPhoto,
      leftFingerPrintText: leftFingerprint,
      rightFingerPrintText: rightFingerprint,
      staticSignature1: signatures[0],
      staticSignature2: signatures[1],
      staticSignature3: signatures[2],
      staticSignature4: signatures[3],
      fssSignature1: signaturesText[0],
      fssSignature2: signaturesText[1],
      fssSignature3: signaturesText[2],
      fssSignature4: signaturesText[3],
    };
    const result = await dispatch(updateKYC(updateData));
    if (result) {
      dispatch(clearSpecificAccount());
      successFunction("KYC updated successFully.");
    } else {
      errorFunction("Failed to update KYC।");
    }
  };

  const verifyAccountNo = async () => {
    if (accountNo === "") {
      errorFunction("Please enter account number.");
    } else if (fingerprint === "") {
      errorFunction("Provide fingerprint");
    } else {
      const result = await dispatch(
        verifyFingerprint({ accountNo, testFingerPrintText: fingerprint })
      );
      if (result) {
        dispatch(getSpecificAccount(accountNo));
        setVerifyAccountNoModal(false);
      } else {
        errorFunction("Finger print doesnot match.");
      }
    }
  };
  useEffect(() => {
    if (account !== null) {
      setAccountId(account?.id);
      setAccountNo(account?.accountNo);
      // setPhoto(account?.photo);
      // setRightFingerprint(account?.rightFingerPrintFile);
      // setLeftFingerprint(account?.leftFingerPrintFile);
      // setSignatures([
      //   account?.staticSignature1,
      //   account?.staticSignature2,
      //   account?.staticSignature3,
      //   account?.staticSignature4,
      // ]);
      // setSignaturesText([
      //   account?.fssSignature1,
      //   account?.fssSignature2,
      //   account?.fssSignature3,
      //   account?.fssSignature4,
      // ]);
    }
  }, [account]);

  return (
    <>
      {loadingAccount && <Loader />}
      {account !== null ? (
        <>
          <FingerPrint
            setImg={setImg}
            startScan={startScan}
            setDeviceId={setDeviceId}
          />
          <section className="form-wrapper">
            <div className="container-fluid">
              <div className="">
                <h1 className="text-center">UPDATE KYC</h1>
                <div className="form">
                  <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    innerRef={(formikActions) =>
                      formikActions
                        ? setFormikValues(formikActions?.values)
                        : setFormikValues({})
                    }
                  >
                    {(formik) => {
                      return (
                        <Form autoComplete="off" className="kyc-form">
                          <div className="row justify-content-center">
                            <div className="col-3">
                              <div className="form-group">
                                <label htmlFor="name " className="m-0 label">
                                  Name
                                </label>
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="Name"
                                />
                                <ErrorMessage name="name" component="div" />
                              </div>
                              <div className="form-group">
                                <label htmlFor="address " className="m-0">
                                  Address:
                                </label>
                                <Field
                                  type="text"
                                  name="address"
                                  placeholder="Address"
                                />
                                <ErrorMessage name="address" component="div" />
                              </div>
                              <div className="form-group">
                                <label htmlFor="phoneNo" className="m-0">
                                  Contact
                                </label>
                                <Field
                                  type="text"
                                  name="phoneNo"
                                  placeholder="Phone Number"
                                />
                                <ErrorMessage name="phoneNo" component="div" />
                              </div>
                            </div>
                            <div className=" col-2 d-flex align-items-end flex-column">
                              <div
                                onClick={() => {
                                  setShowModal(true);
                                }}
                              >
                                <label className="m-0 label">Photo</label>
                                <div className="">
                                  <img
                                    src={photo !== "" ? photo : capture}
                                    alt="capture"
                                    height="150"
                                    width="150"
                                    className="border"
                                    style={{ background: "white" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-5 row justify-content-center ">
                              <div className="mr-2">
                                <p className="label m-0">Left Fingerprint</p>
                                <ImageBox img={leftFingerprint} />
                                <div className="w-100 row m-0">
                                  <button
                                    type="button"
                                    className="col-6 border"
                                    style={{
                                      background: "#f27474",
                                      color: "white",
                                    }}
                                    onClick={() => setLeftFingerprint("")}
                                  >
                                    Clear
                                  </button>
                                  <button
                                    type="button"
                                    className="col-6 border"
                                    style={{
                                      background: "rgb(59 99 212)",
                                      color: "white",
                                    }}
                                    onClick={handleLeftCapture}
                                  >
                                    Capture
                                  </button>
                                </div>
                              </div>

                              <div className="ml-2">
                                <p className="label m-0">Right Fingerprint</p>

                                <ImageBox img={rightFingerprint} />
                                <div className="w-100 row m-0">
                                  <button
                                    type="button"
                                    className="col-6 border"
                                    style={{
                                      background: "#f27474",
                                      color: "white",
                                    }}
                                    onClick={() => setRightFingerprint("")}
                                  >
                                    Clear
                                  </button>
                                  <button
                                    type="button"
                                    className="col-6 border"
                                    style={{
                                      background: "rgb(59 99 212)",
                                      color: "white",
                                    }}
                                    onClick={handleRightCapture}
                                  >
                                    Capture
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row justify-content-center">
                            <div className="col-5 row justify-content-center">
                              <div className="col-4 mr-4 p-0">
                                <div className="form-group ">
                                  <p className="label m-0">Signature</p>
                                  <div
                                    className="border w-100"
                                    style={{
                                      height: "130px",
                                      background: "white",
                                    }}
                                  >
                                    {signatures[0] ? (
                                      <img
                                        src={signatures[0]}
                                        alt="signature"
                                      />
                                    ) : (
                                      <div style={{ height: "130px" }}></div>
                                    )}
                                  </div>
                                  <div className="w-100 row m-0">
                                    <button
                                      type="button"
                                      className="col-6 border"
                                      style={{
                                        background: "#f27474",
                                        color: "white",
                                      }}
                                      onClick={() => handleSignatureClear(0)}
                                    >
                                      Clear
                                    </button>
                                    <button
                                      type="button"
                                      className="col-6 border"
                                      style={{
                                        background: "rgb(59 99 212)",
                                        color: "white",
                                      }}
                                      disabled={signatures[0] !== ""}
                                      onClick={() => handleSignatureCapture(0)}
                                    >
                                      Capture
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 mr-4 p-0">
                                <div className="form-group ">
                                  <p className="label m-0">Signature</p>
                                  <div
                                    className="border w-100"
                                    style={{
                                      height: "130px",
                                      background: "white",
                                    }}
                                  >
                                    {signatures[1] ? (
                                      <img
                                        src={signatures[1]}
                                        alt="signature"
                                      />
                                    ) : (
                                      <div style={{ height: "130px" }}></div>
                                    )}
                                  </div>
                                  <div className="w-100 row m-0">
                                    <button
                                      type="button"
                                      className="col-6 border"
                                      style={{
                                        background: "#f27474",
                                        color: "white",
                                      }}
                                      onClick={() => handleSignatureClear(1)}
                                    >
                                      Clear
                                    </button>
                                    <button
                                      type="button"
                                      className="col-6 border"
                                      style={{
                                        background: "rgb(59 99 212)",
                                        color: "white",
                                      }}
                                      disabled={signatures[1] !== ""}
                                      onClick={() => handleSignatureCapture(1)}
                                    >
                                      Capture
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 mr-4 p-0">
                                <div className="form-group ">
                                  <p className="label m-0">Signature</p>
                                  <div
                                    className="border w-100"
                                    style={{
                                      height: "130px",
                                      background: "white",
                                    }}
                                  >
                                    {signatures[2] ? (
                                      <img
                                        src={signatures[2]}
                                        alt="signature"
                                      />
                                    ) : (
                                      <div style={{ height: "130px" }}></div>
                                    )}
                                  </div>
                                  <div className="w-100 row m-0">
                                    <button
                                      type="button"
                                      className="col-6 border"
                                      style={{
                                        background: "#f27474",
                                        color: "white",
                                      }}
                                      onClick={() => handleSignatureClear(2)}
                                    >
                                      Clear
                                    </button>
                                    <button
                                      type="button"
                                      className="col-6 border"
                                      style={{
                                        background: "rgb(59 99 212)",
                                        color: "white",
                                      }}
                                      disabled={signatures[2] !== ""}
                                      onClick={() => handleSignatureCapture(2)}
                                    >
                                      Capture
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-4 mr-4 p-0">
                                <div className="form-group ">
                                  <p className="label m-0">Signature</p>
                                  <div
                                    className="border w-100"
                                    style={{
                                      height: "130px",
                                      background: "white",
                                    }}
                                  >
                                    {signatures[3] ? (
                                      <img
                                        src={signatures[3]}
                                        alt="signature"
                                      />
                                    ) : (
                                      <div style={{ height: "130px" }}></div>
                                    )}
                                  </div>
                                  <div className="w-100 row m-0">
                                    <button
                                      type="button"
                                      className="col-6 border"
                                      style={{
                                        background: "#f27474",
                                        color: "white",
                                      }}
                                      onClick={() => handleSignatureClear(3)}
                                    >
                                      Clear
                                    </button>
                                    <button
                                      type="button"
                                      disabled={signatures[3] !== ""}
                                      onClick={() => handleSignatureCapture(3)}
                                      className="col-6 border"
                                      style={{
                                        background: "rgb(59 99 212)",
                                        color: "white",
                                      }}
                                    >
                                      Capture
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-lg-12 justify-content-center">
                              <div className="site-button d-flex justify-content-center ">
                                <button
                                  type="submit"
                                  className="site-button- mt-2"
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

          {showModal && (
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              header="Capture pic"
              size={"modal-md change-password-size"}
              edit={false}
              types={types}
            >
              <CameraModal
                setPhoto={setPhoto}
                setShowModal={setShowModal}
                setShowCropModal={setShowCropModal}
              />
            </Modal>
          )}
          {showCropModal && (
            <Modal
              showModal={showCropModal}
              setShowModal={setShowCropModal}
              header="Crop Photo"
              size={"modal-md change-password-size"}
              edit={false}
              types={types}
            >
              <CropModal
                setShowCropModal={setShowCropModal}
                setPhoto={setPhoto}
                photo={photo}
              />
            </Modal>
          )}

          {showResponseModal && (
            <ResponseModal
              showModal={showResponseModal}
              setShowModal={setShowResponseModal}
              size="modal-md"
              success={false}
              responseText={"Fingerprint doesn't match."}
            />
          )}
        </>
      ) : (
        <section className="form-wrapper">
          <div className="container-fluid">
            <div className="">
              <h1 className="text-center">UPDATE KYC</h1>
              <div className="form">
                <div className="row justify-content-center">
                  <div className="col-3">
                    <div className="form-group">
                      <label htmlFor="Account Number" className="m-0 label">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNo"
                        value={accountNo}
                        placeholder="Account Number"
                        onChange={(e) => setAccountNo(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12 justify-content-center">
                    <div className="site-button d-flex justify-content-center ">
                      <button
                        type="button"
                        className="site-button- mt-2"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {verifyAccountNoModal && (
        <div className="modal display-block" id="popUpAccountWindow">
          <div className="modal-dialog">
            <div className="modal-content">
              {/* <!-- header --> */}
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setFingerprint("");
                    setVerifyAccountNoModal(false);
                  }}
                >
                  &times;
                </button>
                <div className="modal-head">
                  <h1 className="modal-title">Verify Fingerprint</h1>
                </div>
              </div>
              {/* <!-- body --> */}
              <div className="modal-body">
                <FingerprintChequeModal
                  setShowFingerPrintModal={setVerifyAccountNoModal}
                  fingerprint={fingerprint}
                  setFingerprint={setFingerprint}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success mt-4"
                  onClick={verifyAccountNo}
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KYCUpdate;
