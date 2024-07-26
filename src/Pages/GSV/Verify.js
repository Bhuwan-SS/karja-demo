import React, { useState, Suspense, lazy } from "react";
import { imageConvertor } from "../../utils/imageConvertor";
import axios from "axios";
import { errorFunction, successFunction } from "../../component/Alert";
const CropModal = lazy(() => import("../../Modal/CropModal"));

const Verify = () => {
  // const [showStaticSignatureCropModal, setShowStaticSignatureCropModal] =
  //   useState(false);
  const [signatureFile, setSignatureFile] = useState("");
  const [userName, setUserName] = useState("");
  const handleStaticSignature = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSignatureFile(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleSubmit = async () => {
    const staticSignatureFile =
      signatureFile !== ""
        ? await imageConvertor(signatureFile, "signature.png", "image/png")
        : null;

    const body = new FormData();
    body.append("userName", userName);
    body.append("signature", staticSignatureFile);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/user-app/verify-signature`,
        body,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      successFunction(data?.msg);
    } catch (error) {
      errorFunction("Signature did not matched.");
    }
  };

  return (
    <>
      <h2 className="text-center mt-5">GSV Signature Verification</h2>
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-6 col-md-6">
          <input
            type="text"
            name="userName"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="UserName"
          />
        </div>
      </div>

      <div className="row mt-5 p-5 justify-content-center">
        <div className="col-lg-6 col-md-6">
          <div className="form-group img-upload">
            <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
              <h5> Static Signature</h5>
            </label>
            <div className="file-upload">
              <div className="image-upload-wrap1">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png,.bmp"
                  className="left-dropify"
                  name="idFrontFile"
                  onChange={(e) => handleStaticSignature(e)}
                />
              </div>
              {signatureFile && (
                <div className="img_div mt-2">
                  <img src={signatureFile} alt="signatureFile" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {/* {showStaticSignatureCropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignatureCropModal}
            setShowCropModal={setShowStaticSignatureCropModal}
            imgSrc={signatureFile}
            setCroppedImage={setSignatureFile}
          />
        </Suspense>
      )} */}
    </>
  );
};

export default Verify;
