import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../Modal/modal.css";
const CameraModal = ({
  showCropModal,
  setShowCropModal,
  imgSrc,
  setCroppedImage,
}) => {
  const [cropper, setCropper] = useState();
  const modalClass = showCropModal
    ? "modal display-block"
    : "modal display-none";

  const cropImage = () => {
    if (typeof cropper !== "undefined") {
      setCroppedImage(
        cropper
          .getCroppedCanvas({ width: 400, height: 200 })
          .toDataURL("image/jpeg", 1.0)
      );
    }
    setShowCropModal(false);
  };
  return (
    <>
      <div className={modalClass} id="popUpChequeWindow">
        <div className="modal-dialog ">
          <div className="modal-content">
            {" "}
            {/* <!-- header --> */}{" "}
            <div className="modal-header">
              {/* <button
                type="button"
                className="close"
                onClick={() => setShowCropModal(false)}
              >
                &times;{" "}
              </button>{" "} */}
              <div className="modal-head">
                <h1 className="modal-title"> Crop Photo </h1>{" "}
              </div>{" "}
            </div>{" "}
            {/* <!-- body --> */}{" "}
            <div className="modal-body mx-auto">
              <Cropper
                style={{ width: "100%", height: 400 }}
                initialAspectRatio={2 / 1}
                aspectRatio={16 / 9}
                background={false}
                src={imgSrc}
                dragMode="none"
                cropBoxResizable={false}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />{" "}
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={cropImage}
                >
                  Save{" "}
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
