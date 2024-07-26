import { useState, useEffect, useCallback } from "react";
import { toastErrorFunction, toastSuccessFunction } from "../component/Alert";
import { samples } from "./common";

const FingerPrint = ({
  setImg,
  startScan,
  goingBack = false,
  setGoingBack,
  setValue,
}) => {
  const [currentFormat] = useState(samples[3]);
  const [acquisitionStarted, setAcquisitionStarted] = useState(false);
  const [sdk, setSdk] = useState(null);
  const [myVal, setMyVal] = useState("");
  const [deviceConnected, setDeviceConnected] = useState(false);

  const initializeSDK = async () => {
    let sdkObtained = new window.Fingerprint.WebApi();
    FingerprintSdkTest(sdkObtained);
    setSdk(sdkObtained);
    const devices = await getDevices(sdkObtained);
    // Only update state if component is still mounted
    if (devices?.length === 1) {
      setMyVal(devices[0]);
    }
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  const startCapture = async (currentFormat, device) => {
    const formatId = currentFormat.id;
    const deviceId = device;
    if (!sdk || !myVal || acquisitionStarted) {
      return;
    }

    try {
      toastSuccessFunction("Please,Place your finger on the device.", 2000);
      setAcquisitionStarted(true);
      await sdk.startAcquisition(formatId, deviceId);
    } catch (error) {
      toastErrorFunction(error.message);
    }
  };

  const handleStart = () => {
    if (myVal === "") {
      if (deviceConnected) {
        let sdkObtained = new window.Fingerprint.WebApi();
        FingerprintSdkTest(sdkObtained);
        setSdk(sdkObtained);
        getDevices(sdkObtained);
      } else {
        toastSuccessFunction("Please connect a device.");
      }
    } else {
      startCapture(currentFormat, myVal);
    }
  };

  const stopCapture = async () => {
    if (!acquisitionStarted) {
      return;
    }
    try {
      await sdk.stopAcquisition(myVal);
      setAcquisitionStarted(false);
      if (goingBack) {
        setValue(9);
        setGoingBack(false);
      }
    } catch (error) {
      toastErrorFunction(error.message);
    }
  };

  // list of the devices
  const getDevices = useCallback(async (sdkObtained) => {
    let obtainedDevices = await sdkObtained.enumerateDevices();
    if (obtainedDevices.length === 0) {
      toastErrorFunction("No Reader Detected.Please connect a reader");
    } else if (obtainedDevices.length === 1) {
      return obtainedDevices;
    }
  }, []);

  const FingerprintSdkTest = (sdkObtained) => {
    sdkObtained.onDeviceConnected = (e) => {
      setDeviceConnected(true);
    };
    sdkObtained.onDeviceDisconnected = (e) => {
      // Detects if device gets disconnected - provides deviceUid of disconnected device
      if (e.deviceUid !== "00000000-0000-0000-0000-000000000000") {
        setDeviceConnected(false);
        toastErrorFunction("Device disconnected");
        setMyVal("");
      }
    };
    sdkObtained.onCommunicationFailed = (e) => {
      // Detects if there is a failure in communicating with U.R.U web SDK
      // toastErrorFunction("Communication Failed");
    };
    sdkObtained.onSamplesAcquired = (s) => {
      // Sample acquired event triggers this function
      sampleAcquired(s);
    };
    sdkObtained.onQualityReported = (e) => {
      console.log(window.Fingerprint.QualityCode[e.quality], "quality");
      // Quality of sample acquired - Function triggered on every sample acquired
      // setQuality(window.Fingerprint.QualityCode[e.quality]);
    };
  };

  const sampleAcquired = useCallback(
    (s) => {
      if (currentFormat.id === window.Fingerprint.SampleFormat.PngImage) {
        // If sample acquired format is PNG- perform following call on object recieved
        // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
        // localStorage.setItem("imageSrc", "");
        const samples = JSON.parse(s.samples);
        // localStorage.setItem(
        //   "imageSrc",
        //   "data:image/png;base64," + window.Fingerprint.b64UrlTo64(samples[0])
        // );
        setImg(
          "data:image/png;base64," + window.Fingerprint.b64UrlTo64(samples[0])
        );
      } else {
        toastErrorFunction("Format Error");
      }
    },
    [currentFormat]
  );

  useEffect(() => {
    if (startScan && myVal !== "") {
      handleStart();
    }
    if (!startScan) {
      stopCapture();
    }
  }, [startScan, myVal]);

  return <></>;
};

export default FingerPrint;
