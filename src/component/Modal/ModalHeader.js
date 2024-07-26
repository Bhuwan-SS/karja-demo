import "./Modal.css";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ModalHeader = ({
  header,
  setShowModal,
  setStartScan,
  types,
  edit,
  clearAction,
  draftData,
  type,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClose = async () => {
    if (types === "capture") {
      setShowModal(false);
    } else if (type === "account") {
      history.push("/");
      setShowModal(false);
    } else if (type === "accountForm") {
      setShowModal(false);
    }
  };
  return (
    <div className="modal-header d-flex justify-content-between">
      <h5 className="modal-title" id="myExtraLargeModalLabel">
        {header}
      </h5>
      <button
        onClick={(e) => handleClose()}
        type="button"
        className="btn-close"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ModalHeader;
