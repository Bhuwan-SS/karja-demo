import React from "react";

const StaticSignature = ({ signatureFiles, setSignatureFiles }) => {
  const handleStaticSignature = (e, i) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const updated = signatureFiles.map((file, index) => {
        if (index === i) {
          return reader.result;
        } else {
          return file;
        }
      });
      setSignatureFiles(updated);
    };
    reader.readAsDataURL(files[0]);
    // setShowStaticSignatureCropModal(true);
    e.target.value = "";
  };
  return (
    <>
      {[...Array(4)].map((_, i) => {
        return (
          <div className="col-lg-6 col-md-6" key={i}>
            <div className="form-group img-upload">
              <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
                <h5> Static Signature</h5>
              </label>
              <div className="file-upload">
                {/* <button
                className="btn btn-primary mb-2"
                type="button"
                onClick={clickFront}
              >
                Browse
              </button> */}

                <div className="image-upload-wrap1">
                  <input
                    type="file"
                    className="left-dropify"
                    name="idFrontFile"
                    onChange={(e) => handleStaticSignature(e, i)}
                  />
                </div>
                {signatureFiles[i] && (
                  <div className="img_div mt-2">
                    <img src={signatureFiles[i]} alt="signatureFiles" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
       {/* {showStaticSignatureCropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignatureCropModal}
            setShowCropModal={setShowStaticSignatureCropModal}
            imgSrc={signatureFile6}
            setCroppedImage={setSignatureFile6}
          />
        </Suspense>
      )} */}
    </>
  );
};

export default StaticSignature;
