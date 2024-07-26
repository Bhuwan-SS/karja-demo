import React, { useEffect, useState } from "react";
import "./modal.css";
import { errorFunction } from "../component/Alert";
import { loginSignature } from "../Redux/Auth/thunk";
import { useDispatch, useSelector } from "react-redux";
const SignInWithSignature = ({
  showSignatureModal,
  setShowSignatureModal,
  userName,
  setUserName,
}) => {
  const [signatures, setSignatures] = useState([""]);
  const [signaturesText, setSignaturesText] = useState([""]);

  const dispatch = useDispatch();
  const modalClass = showSignatureModal
    ? "modal display-block"
    : "modal display-none";

  const handleSubmit = async () => {
    if (signatures[0] === "") {
      errorFunction("Please provide signature");
    } else {
      const signatureText = signatures[0];
      const result = await dispatch(loginSignature(signatureText, userName));
      if (result) {
        setSignatures([""]);
        setSignaturesText([""]);
        setShowSignatureModal(false);
      } else {
        setSignatures([""]);
        setSignaturesText([""]);
      }
    }
  };

  useEffect(() => {
    window.test();
  }, []);

  const handleClose = () => {
    setSignatures([""]);
    setSignaturesText([""]);
    setShowSignatureModal(false);
  };

  const handleSignatureCapture = (pos) => {
    window.capture(
      signatures,
      setSignatures,
      signaturesText,
      setSignaturesText,
      pos
    );
  };
  const handleSignatureClear = async () => {
    setSignatures([""]);
    setSignaturesText([""]);
  };
  return (
    // <!-- Log-In-modal-form -->
    <div className={modalClass} id="popUpChequeWindow">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* <!-- header --> */}
          <div className="modal-header">
            <button type="button" className="close" onClick={handleClose}>
              &times;
            </button>
            <div className="modal-head">
              <h1 className="modal-title">Sign in with signature!</h1>
            </div>
          </div>
          {/* <!-- body --> */}
          <div className="modal-body">
            <div className="form-group ">
              <span>
                <h3>Signature</h3>
              </span>
              <div
                className=" boxed"
                style={{
                  height: "202px",
                  width: "402px",
                  border: "1px solid #000",
                  margin: "auto",
                }}
              >
                {signatures[0] !== "" && (
                  <img src={signatures[0]} alt="signature" />
                )}
              </div>
              <button
                type="button"
                className="btn btn-success mr-5 ml-5 mt-3"
                onClick={() => handleSignatureCapture(0)}
              >
                Capture
              </button>
              <button
                type="button"
                className="btn btn-danger ml-5 mt-3"
                onClick={() => handleSignatureClear()}
              >
                Clear
              </button>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn" onClick={handleSubmit}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInWithSignature;
