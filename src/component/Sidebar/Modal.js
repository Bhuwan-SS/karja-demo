// Modal.js
import React from "react";
import "../../Modal/modal.css";
const Modal = () => {
  return (
    <div className="modal  display-block ">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <iframe
            title="WebApp Modal"
            src="http://localhost:3000/enroll?id=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWYiOiIzNDU2NzgyIiwiYWNjb3VudE5vIjoiMzExMiIsImJsb2NrZWQiOiIwIn0.f9YnkntYq-rZN2rhUvRjfapoKbwchVOb6_4upmIK-_A"
            allow="camera"
            height="600px"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
