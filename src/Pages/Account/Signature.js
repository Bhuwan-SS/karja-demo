import React, { useEffect } from "react";

const Signature = ({
  signatures,
  signatureError,
  handleSignatureCapture,
  handleSignatureClear,
  type = "",
}) => {
  useEffect(() => {
    type === "" && window.startSignatureService();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center">
        <div className="form-group mr-2 " style={{ width: "190px" }}>
          <p className="form-label text-center m-0">Signature 1</p>
          <div
            className="image border w-100 d-flex"
            style={{
              height: "180px",
              background: "white",
            }}
          >
            {signatures[0] ? (
              <img
                src={signatures[0]}
                alt="signature"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div style={{ height: "150px" }}></div>
            )}
          </div>
          {type === "" && (
            <div className="w-100 row m-0">
              <button
                type="button"
                className="border-0 w-50"
                style={{
                  background: "#f27474",
                  color: "white",
                }}
                onClick={() => handleSignatureClear(0)}
              >
                Clear
              </button>
              <button
                type="button"
                className="w-50 border-0"
                style={{
                  background: "rgb(59 99 212)",
                  color: "white",
                }}
                disabled={signatures[0] !== ""}
                onClick={() => handleSignatureCapture(0)}
              >
                Capture
              </button>
            </div>
          )}
        </div>

        <div className="form-group ml-2  " style={{ width: "190px" }}>
          <p className="form-label text-center m-0">Signature 2</p>
          <div
            className="image border w-100 d-flex"
            style={{
              height: "180px",
              background: "white",
            }}
          >
            {signatures[1] ? (
              <img
                src={signatures[1]}
                alt="signature"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <div style={{ height: "150px" }}></div>
            )}
          </div>
          {type === "" && (
            <div className="w-100  m-0">
              <button
                type="button"
                className=" border-0 w-50"
                style={{
                  background: "#f27474",
                  color: "white",
                }}
                onClick={() => handleSignatureClear(1)}
              >
                Clear
              </button>
              <button
                type="button"
                className="w-50 border-0"
                style={{
                  background: "rgb(59 99 212)",
                  color: "white",
                }}
                disabled={signatures[1] !== ""}
                onClick={() => handleSignatureCapture(1)}
              >
                Capture
              </button>
            </div>
          )}
        </div>
      </div>
      {signatureError && (
        <div className="text-left">
          <h4 style={{ color: "red" }}>Required!</h4>
        </div>
      )}
    </div>
  );
};

export default Signature;
