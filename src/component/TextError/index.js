import React from "react";
const TextError = (props) => {
  return (
    <div className="text-left" style={{ color: "#bf202f" }}>
      {props.children}
    </div>
  );
};

export default TextError;
