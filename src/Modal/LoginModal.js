import { useState } from "react";
import "./modal.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../component/TextError";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { errorFunction } from "../component/Alert";
import { login } from "../Redux/Auth/thunk";
import Loader from "../component/Loader";
import { FaFingerprint, FaSignature } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import SignInWithSignature from "./SignInWithSignature";
import SignInWithFingerPrint from "./SignInWithFingerPrint";

const LoginModal = ({ showModal, setShowModal }) => {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const modalClass = showModal ? "modal display-block" : "modal display-none";
  const [type, setType] = useState("password");
  const remember = localStorage.getItem("remember_me");
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showFingerPrintModal, setShowFingerPrintModal] = useState(false);
  const [userName, setUserName] = useState("");
  // const user = localStorage.getItem("userName");
  const initialValues = {
    // branch: "",
    // userName: user ? user : "",
    userName: "",
    password: "",
    remember_me: remember === "true" ? true : false,
  };
  //validation rule htmlFor the form field in formik
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .matches(
        /(?=.*^[A-Za-z_]\w).*$/,
        "Username should begin with _ or alphabet "
      ),
    password: Yup.string().min(4, "Password should be at least 4 characters"),
    remember_me: Yup.bool(),
  });
  //submit handler htmlFor formik
  const onSubmit = async (values) => {
    const { userName, password } = values;
    if (password === "") {
      errorFunction("Please provide the password");
    } else {
      dispatch(login(userName, password));
      // setShowFingerPrintModal(true);
    }
  };

  // toggle password
  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <>
      <div className={modalClass} id="popUpWindow">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- header --> */}
            <div className="modal-header">
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <div className="modal-head">
                <h1 className="modal-title">Welcome !</h1>
                <span>Sign In to continue</span>
              </div>
            </div>
            {/* <!-- body --> */}
            <div className="modal-body">
              <div className="form-wrapper">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form autoComplete="off">
                        <div className="form-group">
                          <label htmlFor="text">Username</label>
                          <Field
                            type="text"
                            name="userName"
                            placeholder="User Name"
                            onBlur={(e) => setUserName(e.target.value.trim())}
                          />
                          <ErrorMessage name="userName" component={TextError} />
                        </div>
                        <div className="form-group password-eye">
                          <label htmlFor="password">Password</label>
                          <Field
                            type={type}
                            name="password"
                            className="form-control"
                            placeholder="Password"
                          />
                          <ErrorMessage name="password" component={TextError} />
                          <span onClick={handleClick}>
                            {type === "password" ? (
                              <span className=" field-icon toggle-password">
                                <BsFillEyeSlashFill />
                              </span>
                            ) : (
                              <span className=" field-icon toggle-password">
                                <BsFillEyeFill />
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="form-group remember-block">
                          <div className="remember">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="exampleCheck1"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="exampleCheck1"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <Tippy content="Login">
                            <button
                              type="submit"
                              className="btn"
                              disabled={loading}
                            >
                              Log-In
                            </button>
                          </Tippy>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={() => setShowFingerPrintModal(true)}
              >
                <FaFingerprint />
              </button>
              <button
                type="button"
                className="btn btn-success ml-2"
                onClick={() => setShowSignatureModal(true)}
              >
                <FaSignature />
              </button>
            </div> */}
            {/* <!-- footer --> */}
          </div>
        </div>
      </div>
      {loading && <Loader />}
      {showFingerPrintModal && (
        <SignInWithFingerPrint
          showFingerPrintModal={showFingerPrintModal}
          setShowFingerPrintModal={setShowFingerPrintModal}
          userName={userName}
          setUserName={setUserName}
        />
      )}
      {showSignatureModal && (
        <SignInWithSignature
          showSignatureModal={showSignatureModal}
          setShowSignatureModal={setShowSignatureModal}
          userName={userName}
          setUserName={setUserName}
        />
      )}
    </>
  );
};

export default LoginModal;
