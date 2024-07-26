import React from "react";
import logo from "../../img/logo/logo.png";
import tick from "../../img/tick.jpg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const AccountCreated = () => {
  const history = useHistory();
  const id = useSelector((state) => state.registration.id);
  return (
    <div className="container-fluid">
      <div className="top">
        <img src={logo} className="site-logo" alt="logo" />
      </div>
      <div className="down">
        <div className="submit-main">
          <h1>Thank You!</h1>
          <img className="tick" src={tick} alt="success" />
          <h2 align="center">
            You have successfully submitted your Account <br />
            Opening Form.
          </h2>
          {/* <p>We will let you know when your account can be accessed.</p> */}
          <h2>
            Your account number is:{" "}
            <strong style={{ color: "red" }}>{id}</strong>
          </h2>
          <br />
          <button className="next" onClick={() => history.push("/")}>
            DONE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
