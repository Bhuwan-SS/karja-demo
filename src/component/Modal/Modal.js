import "./Modal.css";
import React, { useEffect, useRef } from "react";
import ModalHeader from "./ModalHeader";

const Modal = ({
  children,
  showModal,
  setShowModal,
  setStartScan,
  header,
  types,
  size,
  id,
  edit,
  clearAction,
  draftData,
  type,
}) => {
  const modalClass = showModal ? "modal display-block" : "modal display-none";
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
        setStartScan && setStartScan(false);
      }
    };
    ref.current.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <div
        className={modalClass}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        id={id}
      >
        <div
          className={`modal-dialog modal-dialog-centered ${size ? size : ""}`}
        >
          <div className="modal-content">
            <ModalHeader
              header={header}
              setShowModal={setShowModal}
              setStartScan={setStartScan}
              types={types}
              edit={edit}
              clearAction={clearAction}
              draftData={draftData}
              type={type}
            />
            <div className="modal-body" ref={ref}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
