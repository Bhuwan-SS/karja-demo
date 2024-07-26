import React, { useRef } from "react";
import Webcam from "react-webcam";
import "../Modal/modal.css";
const CameraModal = ({
  webcamEnabled,
  setWebcamEnabled,
  setImgSrc,
  setShowCropModal,
}) => {
  const webcamRef = useRef(null);
  const modalClass = webcamEnabled
    ? "modal display-block"
    : "modal display-none";
  const capture = () => {
   
    // for (let i = 1; i <= 3; i++) {
    const image = webcamRef.current.getScreenshot();
   
    // }
    setImgSrc(image);
    setWebcamEnabled(false);
    setShowCropModal(true);
  };
  return (
    <>
      <div className={modalClass} id="popUpChequeWindow">
        <div className="modal-dialog">
          <div className="modal-content">
            {" "}
            {/* <!-- header --> */}{" "}
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={() => setWebcamEnabled(false)}
              >
                &times;{" "}
              </button>{" "}
              <div className="modal-head">
                <h1 className="modal-title"> Capture Modal </h1>{" "}
              </div>{" "}
            </div>{" "}
            {/* <!-- body --> */}{" "}
            <div className="modal-body mx-auto">
              <Webcam
                width="400"
                audio={false}
                screenshotFormat="image/png"
                ref={webcamRef}
              />{" "}
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={capture}
                >
                  Capture{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export default CameraModal;
