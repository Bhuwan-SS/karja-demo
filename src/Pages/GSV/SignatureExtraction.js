// import React, { useState } from "react";
// import Jimp from "jimp/es";

// import "cropperjs/dist/cropper.css";
// const SignatureExtraction = () => {
//   const [signatures, setSignatures] = useState({
//     signature1: null,
//     signature2: null,
//   });
//   const processCheque = (chequeImage) => {
//     const canvas = document.createElement("canvas");
//     const context = canvas.getContext("2d");

//     const image = new Image();
//     image.onload = () => {
//       // Set the canvas dimensions
//       canvas.width = image.width;
//       canvas.height = image.height;

//       // Draw the image on the canvas
//       context.drawImage(image, 0, 0);

//       // Crop the cheque to extract the signatures
//       const width = image.width;
//       const height = image.height;
//       const signatureWidth = Math.floor(width / 2);
//       const signatureHeight = Math.floor(height / 2);
//       const topLeftX = Math.floor((width - signatureWidth) / 2);
//       const topLeftY = Math.floor((height - signatureHeight) / 2);

//       const signature1Data = context.getImageData(
//         topLeftX,
//         topLeftY,
//         signatureWidth,
//         signatureHeight
//       );
//       const signature2Data = context.getImageData(
//         topLeftX,
//         topLeftY + signatureHeight,
//         signatureWidth,
//         signatureHeight
//       );

//       // Create canvas elements for the signatures
//       const signature1Canvas = document.createElement("canvas");
//       const signature2Canvas = document.createElement("canvas");
//       signature1Canvas.width = signatureWidth;
//       signature1Canvas.height = signatureHeight;
//       signature2Canvas.width = signatureWidth;
//       signature2Canvas.height = signatureHeight;

//       // Draw the signature data onto the canvases
//       const signature1Context = signature1Canvas.getContext("2d");
//       const signature2Context = signature2Canvas.getContext("2d");
//       signature1Context.putImageData(signature1Data, 0, 0);
//       signature2Context.putImageData(signature2Data, 0, 0);

//       // Convert the signatures to base64 data URLs
//       const signature1DataURL = signature1Canvas.toDataURL();
//       const signature2DataURL = signature2Canvas.toDataURL();

//       // Save the signatures in the React state
//       setSignatures({
//         signature1: signature1DataURL,
//         signature2: signature2DataURL,
//       });
//     };

//     // Load the cheque image
//     image.src = URL.createObjectURL(chequeImage);
//   };

//   return (
//     <div>
//       <input type="file" onChange={(e) => processCheque(e.target.files[0])} />
//       {signatures.signature1 && (
//         <img src={signatures.signature1} alt="Signature 1" className="mb-5" />
//       )}
//       {signatures.signature2 && (
//         <img src={signatures.signature2} alt="Signature 2" className="mt-5" />
//       )}
//     </div>
//   );
// };

// export default SignatureExtraction;
