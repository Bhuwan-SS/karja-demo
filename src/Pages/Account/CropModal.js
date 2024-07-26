import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const CropModal = ({ setShowCropModal, setPhoto, photo }) => {
  const [cropper, setCropper] = useState();

  const cropImage = () => {
    if (typeof cropper !== "undefined") {
      setPhoto(
        cropper
          .getCroppedCanvas({ width: 400, height: 400 })
          .toDataURL("image/jpeg", 1.0)
      );
    }
    setShowCropModal(false);
  };
  return (
    <>
      <Cropper
        style={{ width: "100%", height: 400 }}
        initialAspectRatio={ 1}

        background={false}
        src={photo}
        dragMode="none"
        cropBoxResizable={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />{" "}
      <div className="text-center mt-3">
        <button type="button" className="btn btn-primary" onClick={cropImage}>
          Save{" "}
        </button>{" "}
      </div>{" "}
    </>
  );
};

export default CropModal;