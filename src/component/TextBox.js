import React, { forwardRef } from "react";
const TextBox = ( props, ref ) => {
  return (
    <textarea
      ref={ref}
      {...props}
      cols="125"
      rows="15"
      id={props.id}
      style={{
        marginLeft: "15px",
        padding: "10px 10px",
        textAlign: "left",
        display: "none",
      }}
    ></textarea>
  );
};
export default forwardRef(TextBox);
