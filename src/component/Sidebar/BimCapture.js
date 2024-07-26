import React, { useState, useEffect } from "react";
import ImageBox from "../ImageBox";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { imageConvertor } from "../../utils/imageConvertor";
import capture from "../../img/m_header.png";
import "../../Modal/modal.css";
import Modal from "./Modal";

const SidebarEdit = () => {
  const [signatures, setSignatures] = useState(["", "", "", ""]);

  const [photo, setPhoto] = useState("");
  const [leftFingerprint, setLeftFingerprint] = useState("");
  const [rightFingerprint, setRightFingerprint] = useState("");

  const [showModal, setShowModal] = useState(false);

  const initialValues = {};
  //validation rules
  const validationSchema = Yup.object().shape({});

  const dispatch = useDispatch();
  const imgGallery = useSelector((state) => state.registration.imgGallery);

  const boxStyle = {
    height: "202px",
    width: "402px",
    border: "1px solid #000",
  };

  const onSubmit = async () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handleResponse = (event) => {
      if (event?.origin !== "http://localhost:3000") {
        return;
      } else {
        const biometricsData = JSON.parse(event?.data);
        setSignatures(biometricsData?.signatures);
        setPhoto(biometricsData?.photo);
        setLeftFingerprint(biometricsData?.leftFingerprint);
        setRightFingerprint(biometricsData?.rightFingerprint);
        setShowModal(false);
      }
    };
    window.addEventListener("message", handleResponse);
    return () => window.removeEventListener("message", handleResponse);
  }, []);
  return (
    <>
      <div className="modal sidebar-edit display-block ">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close">
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
                              <div className="row justify-content-center">
                                <div className="col-lg-3 col-md-3">
                                  <span>
                                    <h3>Photo</h3>
                                  </span>
                                  <div className="photo-block">
                                    <img
                                      src={photo !== "" ? photo : capture}
                                      alt="capture"
                                      height="150"
                                      width="150"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="row justify-content-center">
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
                                            <ImageBox img={leftFingerprint} />
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
                                            <ImageBox img={rightFingerprint} />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
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
                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="form-group ">
                                    <span>
                                      <h3>Dynamic Signature</h3>
                                    </span>
                                    <div className=" boxed" style={boxStyle}>
                                      {signatures[2] !== "" && (
                                        <img
                                          src={signatures[2]}
                                          alt="signature"
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6">
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
                                  </div>
                                </div>

                                <div className="col-lg-12">
                                  <div className="site-button">
                                    <button
                                      type="submit"
                                      className="site-button-"
                                    >
                                      Capture
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
      {showModal && <Modal />}
    </>
  );
};

export default SidebarEdit;
