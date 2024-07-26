import React, { useState, Suspense, lazy } from "react";
import { imageConvertor } from "../../utils/imageConvertor";
import axios from "axios";
const CropModal = lazy(() => import("../../Modal/CropModal"));

const GSV = () => {
  // const [showStaticSignature1CropModal, setShowStaticSignature1CropModal] =
  //   useState(false);
  // const [showStaticSignature2CropModal, setShowStaticSignature2CropModal] =
  //   useState(false);
  // const [showStaticSignature3CropModal, setShowStaticSignature3CropModal] =
  //   useState(false);
  // const [showStaticSignature4CropModal, setShowStaticSignature4CropModal] =
  //   useState(false);
  const [signatureFile1, setSignatureFile1] = useState("");
  const [signatureFile2, setSignatureFile2] = useState("");
  const [signatureFile3, setSignatureFile3] = useState("");
  const [signatureFile4, setSignatureFile4] = useState("");
  const [signatureFile5, setSignatureFile5] = useState("");
  const [signatureFile6, setSignatureFile6] = useState("");

  const [signaturePreview1, setSignaturePreview1] = useState("");
  const [signaturePreview2, setSignaturePreview2] = useState("");
  const [signaturePreview3, setSignaturePreview3] = useState("");
  const [signaturePreview4, setSignaturePreview4] = useState("");
  const [signaturePreview5, setSignaturePreview5] = useState("");
  const [signaturePreview6, setSignaturePreview6] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleStaticSignature1 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => setSignaturePreview1([reader.result]);
    setSignatureFile1(e.target.files[0]);
  };

  const handleStaticSignature2 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => setSignaturePreview2([reader.result]);
    setSignatureFile2(e.target.files[0]);
  };
  const handleStaticSignature3 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => setSignaturePreview3([reader.result]);
    setSignatureFile3(e.target.files[0]);
  };
  const handleStaticSignature4 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => setSignaturePreview4([reader.result]);
    setSignatureFile4(e.target.files[0]);
  };
  const handleStaticSignature5 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => setSignaturePreview5([reader.result]);
    setSignatureFile5(e.target.files[0]);
  };
  const handleStaticSignature6 = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => setSignaturePreview6([reader.result]);
    setSignatureFile6(e.target.files[0]);
  };
  const handleSubmit = async () => {
    // const staticSignatureFile1 =
    //   signatureFile1 !== ""
    //     ? await imageConvertor(signatureFile1, "signature.png", "image/png")
    //     : null;
    // const staticSignatureFile2 =
    //   signatureFile1 !== ""
    //     ? await imageConvertor(signatureFile2, "signature.png", "image/png")
    //     : null;

    // const staticSignatureFile3 =
    //   signatureFile1 !== ""
    //     ? await imageConvertor(signatureFile3, "signature.png", "image/png")
    //     : null;
    // const staticSignatureFile4 =
    //   signatureFile1 !== ""
    //     ? await imageConvertor(signatureFile4, "signature.png", "image/png")
    //     : null;

    const body = new FormData();
    body.append("userName", userName);
    body.append("password", password);
    body.append("staticSignature1", signatureFile1);
    body.append("staticSignature2", signatureFile2);
    body.append("staticSignature3", signatureFile3);
    body.append("staticSignature4", signatureFile4);
    body.append("staticSignature5", signatureFile5);
    body.append("staticSignature6", signatureFile6);
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/v1/user-app/save-user`,
      body,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    console.log(data);
  };

  return (
    <>
      <h2 className="text-center mt-5">GSV Signature</h2>
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
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-6 col-md-6">
          <input
            type="password"
            name="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="row mt-5 p-5">
        <div className="col-lg-6">
          <div className="form-group img-upload">
            <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
              <h5> Static Signature 1</h5>
            </label>
            <div className="file-upload">
              <div className="image-upload-wrap1">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp"
                  className="left-dropify"
                  name="idFrontFile"
                  onChange={(e) => handleStaticSignature1(e)}
                />
              </div>
              {signaturePreview1 && (
                <div className="img_div mt-2">
                  <img src={signaturePreview1} alt="signatureFile1" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group img-upload">
            <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
              <h5> Static Signature 2</h5>
            </label>
            <div className="file-upload">
              <div className="image-upload-wrap1">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp"
                  className="left-dropify"
                  name="idFrontFile"
                  onChange={(e) => handleStaticSignature2(e)}
                />
              </div>
              {signaturePreview2 && (
                <div className="img_div mt-2">
                  <img src={signaturePreview2} alt="signatureFile2" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 p-5">
        <div className="col-lg-6 ">
          <div className="form-group img-upload">
            <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
              <h5> Static Signature 3</h5>
            </label>
            <div className="file-upload">
              <div className="image-upload-wrap1">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp"
                  className="left-dropify"
                  name="idFrontFile"
                  onChange={(e) => handleStaticSignature3(e)}
                />
              </div>
              {signaturePreview3 && (
                <div className="img_div mt-2">
                  <img src={signaturePreview3} alt="signatureFile3" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group img-upload">
            <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
              <h5> Static Signature 4</h5>
            </label>
            <div className="file-upload">
              <div className="image-upload-wrap1">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp"
                  className="left-dropify"
                  name="idFrontFile"
                  onChange={(e) => handleStaticSignature4(e)}
                />
              </div>
              {signaturePreview4 && (
                <div className="img_div mt-2">
                  <img src={signaturePreview4} alt="signatureFile4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 p-5">
        <div className="col-lg-6 col-md-6">
          <div className="form-group img-upload">
            <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
              <h5> Static Signature 5</h5>
            </label>
            <div className="file-upload">
              <div className="image-upload-wrap1">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp"
                  className="left-dropify"
                  name="idFrontFile"
                  onChange={(e) => handleStaticSignature5(e)}
                />
              </div>
              {signaturePreview5 && (
                <div className="img_div mt-2">
                  <img src={signaturePreview5} alt="signatureFile5" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group img-upload">
            <label htmlFor="idFrontFile" style={{ textAlign: "center" }}>
              <h5> Static Signature 6</h5>
            </label>
            <div className="file-upload">
              <div className="image-upload-wrap1">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp"
                  className="left-dropify"
                  name="idFrontFile"
                  onChange={(e) => handleStaticSignature6(e)}
                />
              </div>
              {signaturePreview6 && (
                <div className="img_div mt-2">
                  <img src={signaturePreview6} alt="signatureFile6" />
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
      {/* {showStaticSignature1CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature1CropModal}
            setShowCropModal={setShowStaticSignature1CropModal}
            imgSrc={signatureFile1}
            setCroppedImage={setSignatureFile1}
          />
        </Suspense>
      )}
      {showStaticSignature2CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature2CropModal}
            setShowCropModal={setShowStaticSignature2CropModal}
            imgSrc={signatureFile2}
            setCroppedImage={setSignatureFile2}
          />
        </Suspense>
      )}
      {showStaticSignature3CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature3CropModal}
            setShowCropModal={setShowStaticSignature3CropModal}
            imgSrc={signatureFile3}
            setCroppedImage={setSignatureFile3}
          />
        </Suspense>
      )}
      {showStaticSignature4CropModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CropModal
            showCropModal={showStaticSignature4CropModal}
            setShowCropModal={setShowStaticSignature4CropModal}
            imgSrc={signatureFile4}
            setCroppedImage={setSignatureFile4}
          />
        </Suspense>
      )} */}
    </>
  );
};

export default GSV;
