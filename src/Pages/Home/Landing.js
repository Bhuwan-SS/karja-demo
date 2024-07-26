import React, { useState, Suspense, lazy } from "react";
import logo from "../../assets/logo.png";
import cheque from "../../img/cheque.png";
import statement from "../../img/file.png";
import nmb from "../../assets/logo.png";
import accountsimag from "../../../src/img/accounts.png";
import kycupdate from "../../../src/img/kycupdate.png";
import videokyc from "../../../src/img/videokyc.png";
import kyc from "../../img/kyc.png";
import { Link } from "react-router-dom";
const LoginModal = lazy(() => import("../../Modal/LoginModal"));
const ChequeModal = lazy(() => import("../../Modal/ChequeModal"));
const StatementModal = lazy(() => import("../../Modal/StatementModal"));

const Landing = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  return (
    <>
      <div className="site-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="site-logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            {/* <div className="col-lg-6 col-md-6">
              <div className="site-login ">
                <button
                  className="site-button"
                  onClick={() => setShowLoginModal(true)}
                >
                  CBS Login
                </button>
              </div>
              <div className="site-login">
                <button
                  className="site-button mr-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  CBS Register
                </button>
              </div>
              <div className="site-login ">
                <button
                  className="site-button mr-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  CBS Users
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <section className="landing-wrap">
        <div className="landing">
          <div className="container-fluid d-flex justify-content-center flex-column align-items-center">
            <div className="row w-100 mb-4 justify-content-center ">
              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/gsv">
                    <div className="landing-img">
                      <img src={nmb} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>GSV Enroll</h1>
                    </div>
                  </Link>
                </div>
              </div> */}
              <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <p className="coming-soon">KIOSK</p>
                  <Link to="/create-account">
                    <div className="landing-img">
                      <img src={accountsimag} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Account</h1>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/create-account-form">
                    <div className="landing-img">
                      <img src={accountsimag} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Account Form</h1>
                    </div>
                  </Link>
                </div>
              </div>
              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/accounts">
                    <div className="landing-img">
                      <img src={kyc} alt="kyc" />
                    </div>
                    <div className="landing-content">
                      <h1>Account Applications</h1>
                    </div>
                  </Link>
                </div>
              </div> */}
              <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <p className="coming-soon">Comming Soon</p>
                  <Link to="">
                    <div className="landing-img">
                      <img src={kycupdate} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>KYC Update</h1>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/cheque-request">
                    <div className="landing-img">
                      <img src={cheque} alt="cheque" />
                    </div>
                    <div className="landing-content">
                      <h1>Cheque Request</h1>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/statement-request">
                    <div className="landing-img">
                      <img
                        src={statement}
                        alt="statement"
                        width="223"
                        height="182"
                      />
                    </div>
                    <div className="landing-content">
                      <h1>Statement Request</h1>
                    </div>
                  </Link>
                </div>
              </div>
              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/verify">
                    <div className="landing-img">
                      <img src={nmb} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>GSV Verify</h1>
                    </div>
                  </Link>
                </div>
              </div> */}

              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/extraction">
                    <div className="landing-img">
                      <img src={nmb} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Signature Extraction</h1>
                    </div>
                  </Link>
                </div>
              </div> */}

              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/account-info">
                    <div className="landing-img">
                      <img src={nmb} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Bachath Khata</h1>
                    </div>
                  </Link>
                </div>
              </div> */}
            </div>
            <div className="row w-100 justify-content-center">
              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/create-account">
                    <div className="landing-img">
                      <img src={account} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Open an Account</h1>
                    </div>
                  </Link>
                </div>
              </div> */}
              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/test">
                    <div className="landing-img">
                      <img src={account} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Signature Retrieval</h1>
                    </div>
                  </Link>
                </div>
              </div> */}
              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/video-kyc">
                    <div className="landing-img">
                      <img src={videokyc} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Biometrics</h1>
                    </div>
                  </Link>
                </div>
              </div> */}

              {/* <div className="col-lg-2 col-md-6">
                <div className="landing-block">
                  <Link to="/biometrics">
                    <div className="landing-img">
                      <img src={nmb} alt="account" />
                    </div>
                    <div className="landing-content">
                      <h1>Biometrics</h1>
                    </div>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {showLoginModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginModal
            showModal={showLoginModal}
            setShowModal={setShowLoginModal}
          />
        </Suspense>
      )}

      {showStatementModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <StatementModal
            showModal={showStatementModal}
            setShowModal={setShowStatementModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default Landing;
