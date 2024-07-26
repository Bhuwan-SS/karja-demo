import React from "react";
import Spinner from "../../img/spinner.gif";
import "./loader.css";
const Loader = () => {
  return (
    // <div className="spinner-container">
      <div className="spinner">
        <img src={Spinner} alt="spinner" />
      {/* </div> */}
    </div>
  );
};

export default Loader;
