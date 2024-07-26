import React, { useRef } from "react";
import Webcam from "react-webcam";
const CameraModal = ({ setPhoto, setShowModal, setShowCropModal }) => {
  console.log("in");
  const webcamRef = useRef(null);
  const videoConstraints = {
    facingMode: "environment", // Use the rear camera
  };
  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    setPhoto(image);
    setShowModal(false);
    setShowCropModal(true);
  };
  return (
    <>
      <Webcam
        width="100%"
        audio={false}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <div className="text-center">
        <button type="button" className="btn btn-primary" onClick={capture}>
          Capture
        </button>
      </div>
    </>
  );
};
export default CameraModal;
