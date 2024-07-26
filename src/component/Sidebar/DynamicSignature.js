import { useEffect } from "react";

const DynamicSignature = ({ signatures, setSignatures ,signaturesText,setSignaturesText}) => {
  useEffect(() => {
    window.test();
  }, []);
  // signature
  const boxStyle = {
    height: "202px",
    width: "402px",
    border: "1px solid #000",
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
  const handleSignatureClear = async (pos) => {
    const updatedSignatures = signatures.map((sign, i) => {
      if (i === pos) {
        return "";
      } else {
        return sign;
      }
    });
    const updatedSignaturesText = signaturesText.map((sign, i) => {
      if (i === pos) {
        return "";
      } else {
        return sign;
      }
    });
    setSignatures(updatedSignatures);
    setSignaturesText(updatedSignaturesText);
  };
  return (
    <>
      {[...Array(4)].map((_, i) => {
        return (
          <div className="col-lg-6" key={i}>
            <div className="form-group ">
              <span>
                <h3>Dynamic Signature</h3>
              </span>
              <div className=" boxed" style={boxStyle}>
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
                onClick={() => handleSignatureClear(0)}
              >
                Clear
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DynamicSignature;
