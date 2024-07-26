import { useState } from "react";
import ImageBox from "../ImageBox";
import { samples } from "../../utils/common";
import { successFunction } from "../Alert";
import { errorFunction, toastSuccessFunction } from "../Alert";
const FingerPrint = ({ fingerprints, setFingerprints }) => {
  const [sdk, setSdk] = useState(null);
  const [acquisitionStarted, setAcquisitionStarted] = useState(false);
  const [currentFormat] = useState(samples[3]);
  const FingerprintSdkTest = (sdkObtained, index) => {
    sdkObtained.onDeviceConnected = (e) => {
      //   successFunction("Device connected");
    };
    sdkObtained.onDeviceDisconnected = (e) => {
      // Detects if device gets disconnected - provides deviceUid of disconnected device
      if (e.deviceUid !== "00000000-0000-0000-0000-000000000000") {
        errorFunction("Device disconnected");
        // setMyVal("");
      }
    };
    sdkObtained.onCommunicationFailed = (e) => {
      // Detects if there is a failure in communicating with U.R.U web SDK
      // errorFunction("Communication Failed");
      stopCapture();
    };
    sdkObtained.onSamplesAcquired = async (s) => {
      // Sample acquired event triggers this function

      sampleAcquired(s, index);
    };
    sdkObtained.onQualityReported = (e) => {
      // Quality of sample acquired - Function triggered on every sample acquired
      if (e.quality !== 0) {
        stopCapture();
        errorFunction(
          `The quality is ${window.Fingerprint.QualityCode[e.quality]}`
        );
      }
    };
  };

  // list of the devices
  const getDevices = async (sdkObtained) => {
    let obtainedDevices = await sdkObtained.enumerateDevices();
    if (obtainedDevices.length === 0) {
      return "";
    } else if (obtainedDevices.length === 1) {
      return obtainedDevices[0];
    }

    // setDevices(updated);
  };
  const handleStart = async (index) => {
    let sdkObtained = new window.Fingerprint.WebApi();
    FingerprintSdkTest(sdkObtained, index);
    setSdk(sdkObtained);
    const myVal = await getDevices(sdkObtained);

    if (myVal === "") {
      toastSuccessFunction("Please connect a device.");
    } else {
      await startCapture(currentFormat, myVal, sdkObtained);
    }
  };
  const startCapture = async (currentFormat, device, sdkObtained) => {
    const formatId = currentFormat.id;
    const deviceId = device.id;
    if (acquisitionStarted) {
      return;
    }
    try {
      toastSuccessFunction("Please,Place your finger on the device.", 2000);
      await sdkObtained.startAcquisition(formatId, deviceId);
      setAcquisitionStarted(true);
      //Disabling start once started
    } catch (error) {
      errorFunction(error.message);
    }
  };
  const stopCapture = async () => {
    if (!acquisitionStarted) {
      return;
    }
    try {
      await sdk.stopAcquisition();
      setAcquisitionStarted(false);
      setSdk(null);
    } catch (error) {
      errorFunction(error.message);
    }
  };

  const handleClear = (index) => {
    const updated = fingerprints.map((fingerprint, i) => {
      if (index === i) {
        return "";
      } else {
        return fingerprint;
      }
    });
    setFingerprints(updated);
  };
  const sampleAcquired = async (s, index) => {
    if (currentFormat.id === window.Fingerprint.SampleFormat.PngImage) {
      // If sample acquired format is PNG- perform following call on object recieved
      // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
      const samples = JSON.parse(s.samples);
      toastSuccessFunction("Fingerprint is successfully captured", 2000);
      const updated = fingerprints.map((fingerprint, i) => {
        if (i === index) {
          return (
            "data:image/png;base64," + window.Fingerprint.b64UrlTo64(samples[0])
          );
        } else {
          return fingerprint;
        }
      });
      console.log(updated, "updated");
      setFingerprints(updated);
      setAcquisitionStarted(false);
    } else {
      errorFunction("Format Error");
    }
  };

  return (
    <>
        {[...Array(1)].map((_, i) => {
          return (
              <div className="col-lg-6 " key={i}>
                <div className="form-group">
                  <span>
                    <h3>Finger Print</h3>
                  </span>
                  <div className="finger-wrap">
                    <div className="file-upload">
                      <div className="image-upload-wrap">
                        <div className="drag-text">
                          <h3>Left</h3>
                        </div>
                        <div className="ml-4" style={{ marginTop: "-7px" }}>
                          <ImageBox img={fingerprints[i]} />
                        </div>
                      </div>
                    </div>

                    <div className="file-upload">
                      <div className="image-upload-wrap">
                        <div className="drag-text">
                          <h3>right</h3>
                        </div>
                        <div className="ml-4" style={{ marginTop: "-7px" }}>
                          <ImageBox img={fingerprints[i + 1]} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-success mr-4 ml-3"
                  onClick={() => handleStart(i)}
                  disabled={fingerprints[i] !== ""}
                >
                  Capture
                </button>
                <button
                  type="button"
                  className="btn btn-danger "
                  onClick={() => handleClear(i)}
                  disabled={fingerprints[i] === ""}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="btn btn-success mr-5 ml-5"
                  onClick={() => handleStart(i + 1)}
                  disabled={fingerprints[i + 1] !== ""}
                >
                  Capture
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleClear(i + 1)}
                  disabled={fingerprints[i + 1] === ""}
                >
                  Clear
                </button>
              </div>
          );
        })}
    </>
  );
};

export default FingerPrint;
