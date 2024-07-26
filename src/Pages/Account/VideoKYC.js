import React, { useEffect, useState } from "react";
import ImageBox from "../../component/ImageBox";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../component/TextError";
import capture from "../../img/m_header.png";
import "../../Modal/modal.css";
import Modal from "../../component/Modal/Modal";
import { imageConvertor } from "../../utils/imageConvertor";
import { useHistory } from "react-router-dom";
import CameraModal from "./CameraModal";
import CropModal from "./CropModal";
import { enrollVideoKYC } from "../../Redux/Auth/thunk";
import ResponseModal from "../../Modal/ResonseModal";
import { errorFunction } from "../../component/Alert";
import FingerPrint from "../../utils/Fingerprint";

const VideoKYC = () => {
  const [photo, setPhoto] = useState("");
  const [leftFingerprint, setLeftFingerprint] = useState("");
  const [rightFingerprint, setRightFingerprint] = useState("");
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [img, setImg] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [startScan, setStartScan] = useState(false);
  const [finger, setFinger] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const types = "capture";
  const initialValues = {
    name: "",
    address: "",
    phoneNo: "",
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
  const onSubmit = async (values) => {
    const { name, address, phoneNo } = values;
    const userPhoto = await imageConvertor(photo, "photo.png", "image/png");
    const enrollData = {
      name,
      address,
      phoneNo,
      deviceId,
      photo: userPhoto,
      leftFingerPrintText: leftFingerprint,
      rightFingerPrintText: rightFingerprint,
    };

    // const result = await dispatch(enrollVideoKYC(enrollData));
    if (photo === "") {
      errorFunction("Please capture photo.");
    } else if (leftFingerprint === "" || rightFingerprint === "") {
      if (leftFingerprint === "") {
        errorFunction("Please add left fingerprint.");
      } else {
        errorFunction("Please add right finger print.");
      }
    } else {
      setShowResponseModal(true);
    }
  };

  return (
    <div>
      <FingerPrint
        setImg={setImg}
        startScan={startScan}
        setDeviceId={setDeviceId}
      />
      <section className="form-wrapper">
        <div className="container-fluid">
          <div className="">
            <h1 className="text-center">Video KYC</h1>
            <div className="form">
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
                        <div className="col-3">
                          <div className="form-group">
                            <label htmlFor="name " className="m-0 label">
                              Name
                            </label>
                            <Field type="text" name="name" placeholder="Name" />
                            <ErrorMessage name="name" component={TextError} />
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
                            <ErrorMessage
                              name="address"
                              component={TextError}
                            />
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
                            <ErrorMessage
                              name="phoneNo"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className=" col-2 d-flex align-items-end flex-column">
                          <div>
                            <label className="m-0 label">Photo</label>
                            <div
                              className=""
                              onClick={() => {
                                setShowModal(true);
                              }}
                            >
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

                      <div className="row">
                        <div className="col-lg-12 justify-content-center">
                          <div className="site-button d-flex justify-content-center ">
                            <button type="submit" className="site-button- mt-2">
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
          success={true}
          responseText={"Successfully updated video KYC."}
          types="videoKYC"
        />
      )}
    </div>
  );
};

export default VideoKYC;
