import "./modal.css";
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaTimesCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { clearResponseText } from "../Redux/Registration/action";

const Modal = ({
  showModal,
  setShowModal,
  size,
  success,
  responseText,
  types,
  setShowParentModal,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const modalClass = showModal ? "modal display-block" : "modal display-none";
  const handleClose = () => {
    if (types === "videoKYC") {
      setShowModal(false);
      history.push("/");
    } else {
      dispatch(clearResponseText());
      setShowModal(false);
      setShowParentModal && success && setShowParentModal(false);
    }
  };

  return (
    <>
      <div
        className={modalClass}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered ${size ? size : ""}`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={handleClose}>
                &times;
              </button>
              <div className="modal-head">
                <h1 className="modal-title">
                  {success ? "Congratulations!" : "Oops!"}
                </h1>
              </div>
            </div>
            <div className="modal-body">
              {success ? (
                <div className="success-modal">
                  <MdVerified className="text-success" />
                  <br />
                  {responseText}
                </div>
              ) : (
                <div className="failure-modal">
                  <FaTimesCircle className="text-danger" />
                  <br />
                  {responseText}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
