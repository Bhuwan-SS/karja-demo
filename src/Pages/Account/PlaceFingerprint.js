import React, { useState, useEffect } from "react";
import ImageBox from "../../component/ImageBox";
import FingerPrint from "../../utils/Fingerprint";

const PlaceFingerprint = ({
  leftFingerprint,
  setLeftFingerprint,
  rightFingerprint,
  setRightFingerprint,
  fingerprintError,
  goingBack,
  setGoingBack,
  setValue,
  type = "",
}) => {
  const [img, setImg] = useState("");
  const [startScan, setStartScan] = useState(false);

  useEffect(() => {
    if (type === "") {
      if (img === "" && leftFingerprint === "" && rightFingerprint === "") {
        setStartScan(true);
      } else {
        if (leftFingerprint === "") {
          setLeftFingerprint(img);
        } else if (rightFingerprint === "") {
          setRightFingerprint(img);
        }
        setImg("");
      }
    }
  }, [img]);

  useEffect(() => {
    if (type === "") {
      if (!startScan && (leftFingerprint === "" || rightFingerprint === "")) {
        setStartScan(true);
      }
      if (startScan && leftFingerprint !== "" && rightFingerprint !== "") {
        setStartScan(false);
      }
    }
  }, [leftFingerprint, rightFingerprint]);

  useEffect(() => {
    if (goingBack) {
      setStartScan(false);
    }
  }, [goingBack]);
  return (
    <>
      {type === "" && (
        <FingerPrint
          setImg={setImg}
          startScan={startScan}
          goingBack={goingBack}
          setGoingBack={setGoingBack}
          setValue={setValue}
        />
      )}
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center">
          <div className="mr-2 " style={{ minWidth: "160px" }}>
            <p className="form-label m-0 text-center">Left </p>
            <ImageBox img={leftFingerprint} />
            {type === "" && (
              <div className="w-100 row m-0">
                <button
                  type="button"
                  disabled={leftFingerprint === ""}
                  className="w-100 image border-top"
                  style={{
                    background: "#f27474",
                    color: "white",
                  }}
                  onClick={() => setLeftFingerprint("")}
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="ml-2 " style={{ minWidth: "160px" }}>
            <p className="form-label m-0  text-center">Right</p>

            <ImageBox img={rightFingerprint} />
            {type === "" && (
              <div className="w-100 row m-0">
                <button
                  type="button"
                  className="w-100 image border-top"
                  disabled={rightFingerprint === ""}
                  style={{
                    background: "#f27474",
                    color: "white",
                  }}
                  onClick={() => setRightFingerprint("")}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
        {fingerprintError && (
          <div className="text-left">
            <h4 style={{ color: "red" }}>Required!</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceFingerprint;
