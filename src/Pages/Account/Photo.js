import React, { useState } from "react";
import capture from "../../img/m_header.png";
import Modal from "../../component/Modal/Modal";
import CameraModal from "./CameraModal";
import CropModal from "./CropModal";
const Photo = ({ photoError, photo, setPhoto, type = "" }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);

  const types = "capture";
  return (
    <>
      <div className="d-flex  flex-column align-items-center">
        <div className="">
          <div className=" d-flex justify-content-center">
            <div
              onClick={() => {
                type === "" && setShowModal(true);
              }}
            >
              <label className="m-0 form-label text-left">Photo</label>
              <div style={{ border: 0, borderRadius: "6px" }}>
                <img
                  src={photo !== "" ? photo : capture}
                  alt="capture"
                  height="150"
                  width="150"
                  className="image border"
                  style={{ background: "white", borderRadius: "6px" }}
                />
              </div>
            </div>
          </div>
        </div>
        {photoError && (
          <div className="text-left">
            <h4 style={{ color: "red" }}>Required!</h4>
          </div>
        )}
      </div>
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
    </>
  );
};

export default Photo;
