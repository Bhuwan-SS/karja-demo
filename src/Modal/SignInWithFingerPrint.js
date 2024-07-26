import React, { useState, useEffect } from "react";
import ImageBox from "../component/ImageBox";
import { samples } from "../utils/common";
import { errorFunction, toastSuccessFunction } from "../component/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loginThumb } from "../Redux/Auth/thunk";
const SignInWithFingerPrint = ({
  showFingerPrintModal,
  setShowFingerPrintModal,
  userName,
  setUserName,
}) => {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const dispatch = useDispatch();
  const modalClass = showFingerPrintModal
    ? "modal display-block"
    : "modal display-none";

  // fingerprint props
  const [sdk, setSdk] = useState(null);
  const [myVal, setMyVal] = useState("");
  const [disableExport, setDisableExport] = useState(false);
  const [acquisitionStarted, setAcquisitionStarted] = useState(false);
  const [img, setImg] = useState("");
  const [currentFormat] = useState(samples[3]);

  const handleSubmit = async () => {
    setShowFingerPrintModal(false);
  };
  const handleClear = () => {
    localStorage.setItem("imageSrc", "");
    localStorage.setItem("wsq", "");
    localStorage.setItem("raw", "");
    localStorage.setItem("intermediate", "");
    setImg("");
    setDisableExport(true);
    stopCapture();
  };

  const startCapture = async (currentFormat, device) => {
    const formatId = currentFormat.id;
    const deviceId = device.id;
    if (acquisitionStarted) {
      return;
    }
    try {
      toastSuccessFunction("Please,Place your finger on the device.", 2000);
      await sdk.startAcquisition(formatId, deviceId);

      setAcquisitionStarted(true);
      //Disabling start once started
    } catch (error) {
      errorFunction(error.message);
    }
  };
  useEffect(() => {
    if (img !== "") {
      stopCapture();
    }
  }, [img]);
  useEffect(() => {
    localStorage.clear();
    let sdkObtained = new window.Fingerprint.WebApi();
    FingerprintSdkTest(sdkObtained);
    setSdk(sdkObtained);
    getDevices(sdkObtained);
    setDisableExport(true);
  }, []);
  const handleStart = async () => {
    if (myVal === "") {
      if (deviceConnected) {
        localStorage.clear();
        let sdkObtained = new window.Fingerprint.WebApi();

        FingerprintSdkTest(sdkObtained);
        setSdk(sdkObtained);
        getDevices(sdkObtained);
      } else {
        toastSuccessFunction("Please connect a device.");
      }
    } else {
      // setQuality("");
      await startCapture(currentFormat, myVal);
    }
  };
  const stopCapture = async () => {
    if (!acquisitionStarted) {
      return;
    }
    try {
      await sdk.stopAcquisition(myVal);
      setAcquisitionStarted(false);
      setDisableExport(false);
      //Disabling start once started
      // disableEnableStartStop(false);
    } catch (error) {
      errorFunction(error.message);
    }
  };

  // list of the devices
  const getDevices = async (sdkObtained) => {
    let obtainedDevices = await sdkObtained.enumerateDevices();
    // const updated = obtainedDevices.map((device) => {
    //   return { name: device, id: device };
    // });
    if (obtainedDevices.length === 0) {
      // errorFunction("No Reader Detected.Please connect a reader");
    } else if (obtainedDevices.length === 1) {
      setMyVal(obtainedDevices[0]);
    }

    // setDevices(updated);
  };
  const FingerprintSdkTest = (sdkObtained) => {
    sdkObtained.onDeviceConnected = (e) => {
      setDeviceConnected(true);
      //   successFunction("Device Connected");
    };
    sdkObtained.onDeviceDisconnected = (e) => {
      // Detects if device gets disconnected - provides deviceUid of disconnected device
      if (e.deviceUid !== "00000000-0000-0000-0000-000000000000") {
        setDeviceConnected(false);
        errorFunction("Device disconnected");
        // setMyVal("");
      }
    };
    sdkObtained.onCommunicationFailed = (e) => {
      // Detects if there is a failure in communicating with U.R.U web SDK
      // errorFunction("Communication Failed");
    };
    sdkObtained.onSamplesAcquired = async (s) => {
      // Sample acquired event triggers this function
      sampleAcquired(s);
    };
    sdkObtained.onQualityReported = (e) => {
      // Quality of sample acquired - Function triggered on every sample acquired
      // setQuality(window.Fingerprint.QualityCode[e.quality]);
    };
  };

  const sampleAcquired = async (s) => {
    if (currentFormat.id === window.Fingerprint.SampleFormat.PngImage) {
      // If sample acquired format is PNG- perform following call on object recieved
      // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
      localStorage.setItem("imageSrc", "");
      const samples = JSON.parse(s.samples);
      localStorage.setItem(
        "imageSrc",
        "data:image/png;base64," + window.Fingerprint.b64UrlTo64(samples[0])
      );

      setImg(localStorage.getItem("imageSrc"));
    } else {
      errorFunction("Format Error");
      setDisableExport(true);
    }
  };
  return (
    <>
      <div className={modalClass} id="popUpChequeWindow">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- header --> */}
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={() => setShowFingerPrintModal(false)}
              >
                &times;
              </button>
              <div className="modal-head">
                <h1 className="modal-title">Sign in with fingerprint!</h1>
              </div>
            </div>
            {/* <!-- body --> */}
            <div className="modal-body">
              <div className="form-group ">
                <span>
                  <h3>FingerPrint</h3>
                </span>
                <div className="row d-flex justify-content-center">
                  <div id="imagediv" className="mt-2 mr-4">
                    <ImageBox img={img} />
                  </div>
                </div>
                <div className="text-center mt-4 mb-5">
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={handleClear}
                    disabled={img === ""}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={handleStart}
                    disabled={img !== ""}
                  >
                    Capture
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary me-2"
                    disabled={disableExport}
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInWithFingerPrint;