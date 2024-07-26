import React, { useState, useEffect } from "react";
import ImageBox from "../../component/ImageBox";
import FingerPrint from "../../utils/Fingerprint";
const PlaceFingerprint = ({
  fingerprint,
  setFingerprint,
}) => {
  const [img, setImg] = useState("");
  const [startScan, setStartScan] = useState(false);

  useEffect(() => {
    if (img === "" && fingerprint === "") {
      setStartScan(true);
    } else {
      if (fingerprint === "") {
        setFingerprint(img);
      }
      setImg("");
    }
  }, [img]);

  useEffect(() => {
    if (!startScan && fingerprint === "") {
      setStartScan(true);
    }
    if (startScan && fingerprint !== "") {
      setStartScan(false);
    }
  }, [fingerprint]);

  return (
    <>
      <FingerPrint setImg={setImg} startScan={startScan} />
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex justify-content-center bg-white rounded p-4">
          <div className="mr-2 bg-white " style={{ minWidth: "160px" }}>
            <p className="form-label m-0 text-center">FingerPrint</p>
            <ImageBox img={fingerprint} />
            <div className="w-100 row m-0">
              <button
                type="button"
                disabled={fingerprint === ""}
                className="w-100 image border-top"
                style={{
                  background: "#f27474",
                  color: "white",
                }}
                onClick={() => setFingerprint("")}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
};

export default PlaceFingerprint;
