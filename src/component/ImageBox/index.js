import React from "react";

const ImageBox = ({ img }) => {
  return (
    <>
      {img ? (
        <div
          className="image border-top m-0 w-100 d-flex justify-content-center"
          style={{ background: "white", height: "150px", width: "150px", borderRadius: "4px" }}
        >
          <img src={img} alt="logo" height="200px" />
        </div>
      ) : (
        <div
          className="image border-top m-0  w-100 d-flex justify-content-center align-items-center"
          style={{ background: "white", height: "150px", width: "150px", borderRadius: "4px" }}
        >
          No Image
        </div>
      )}
    </>
  );
};

export default ImageBox;
