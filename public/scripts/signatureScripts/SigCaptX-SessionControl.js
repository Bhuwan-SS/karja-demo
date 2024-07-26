/* **************************************************************************
  SigCaptX-SessionControl.js
   
  This file contains functions which are used for controlling the starting and stopping
  of the wizard session. It also contains the calls to the pad and screen definition
  functions in SigCaptX-Wizard-PadDefs.js 
  
  Copyright (c) 2018 Wacom Co. Ltd. All rights reserved.
  
   v4.0
  
***************************************************************************/

function bodyOnLoad() {
  actionWhenRestarted();
}



/* This function is called if connection with the SigCaptX service has to be re-initiated because for whatever reason it has stopped or failed */
function actionWhenRestarted(callback) {
  wgssSignatureSDK = null;
  sigObj = null;
  sigCtl = null;
  dynCapt = null;
  wizCtl = null;
  pad = null;

  // var imageBox = document.getElementById("imageBox");
  
  // if (null != imageBox.firstChild) {
  //   imageBox.removeChild(imageBox.firstChild);
  // }

  var timeout = setTimeout(timedDetect, TIMEOUT);

  // pass the starting service port  number as configured in the registry
  wgssSignatureSDK = new WacomGSS_SignatureSDK(onDetectRunning, SERVICEPORT);

  function timedDetect() {
    if (wgssSignatureSDK.running) {
      print("Signature SDK Service detected.");
      start();
    } else {
      print("Signature SDK Service not detected.");
    }
  }

  function onDetectRunning() {
    if (wgssSignatureSDK.running) {
      print("Signature SDK Service detected.");
      clearTimeout(timeout);
      start();
    } else {
      print("Signature SDK Service not detected.");
    }
  }

  function start() {
    if (wgssSignatureSDK.running) {
      print("Checking components ...");
      sigCtl = new wgssSignatureSDK.SigCtl(onSigCtlConstructor);
    }
  }

  function onSigCtlConstructor(sigCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      sigCtl.PutLicence(LICENCEKEY, onSigCtlPutLicence);
    } else {
      print("SigCtl constructor error: " + status);
    }
  }

  function onSigCtlPutLicence(sigCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      dynCapt = new wgssSignatureSDK.DynamicCapture(onDynCaptConstructor);
    } else {
      print("SigCtl constructor error: " + status);
    }
  }

  function onDynCaptConstructor(dynCaptV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      sigCtl.GetSignature(onGetSignature);
    } else {
      print("DynCapt constructor error: " + status);
    }
  }

  function onGetSignature(sigCtlV, sigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      sigObj = sigObjV;
      sigCtl.GetProperty("Component_FileVersion", onSigCtlGetFileVersion);
    } else {
      print("SigCapt GetSignature error: " + status);
    }
  }

  function onSigCtlGetFileVersion(sigCtlV, property, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      print("DLL: flSigCOM.dll  v" + property.text);
      dynCapt.GetProperty("Component_FileVersion", onDynCaptGetFileVersion);
    } else {
      print("SigCtl GetProperty error: " + status);
    }
  }

  function onDynCaptGetFileVersion(dynCaptV, property, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      print("DLL: flSigCapt.dll v" + property.text);
      print("Test application ready.");
      print("Press 'Capture' or 'Start Wizard' to capture a signature.");
      if ("function" === typeof callback) {
        callback();
      }
    } else {
      print("DynCapt GetProperty error: " + status);
    }
  }
}


