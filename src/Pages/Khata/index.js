import React from "react";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
const Khata = () => {
  return (
    <>
      <header className="kyc-header account-head">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="header-img">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-8">
              <div className="header-icons-group">
                <h2>Open Talab Khata</h2>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="kyc-wrap account-open">
        <div className="container-fluid">
          <div className="tabs-khata">
            <div className="row">
              <div className="col-3">
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Talab Khata
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Mahila Khata
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-messages-tab"
                    data-toggle="pill"
                    href="#v-pills-messages"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    Bachat Khata
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-settings-tab"
                    data-toggle="pill"
                    href="#v-pills-settings"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    Brida Khata
                  </a>
                </div>
              </div>
              <div className="col-9">
                <div className="tab-content p-4" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    NMB Talab Khata is designed to provide one stop solution for
                    your convenience, to help you make the most out of your
                    salary. It offers unique features and benefits relevant to
                    your needs. Special Feature: No Charge on cash withdrawal
                    from any ATM all over Nepal plus Accidental Insurance of
                    NPR. 700,000 (in words: Seven Lakh only-).
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    Jeevan Chakr is a deposit product, which encapsulates 7
                    sub-products, that aims to cater entire banking needs of a
                    natural person from the point of birth to elderly stage of
                    life. The novel product features offered under Jeevan
                    Chakra, are segregated for seven different life stages to
                    best match respective age group characteristics, is designed
                    to cater entire banking needs of an individual.
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                  >
                    Jeevan Chakr is a deposit product, which encapsulates 7
                    sub-products, that aims to cater entire banking needs of a
                    natural person from the point of birth to elderly stage of
                    life. The novel product features offered under Jeevan
                    Chakra, are segregated for seven different life stages to
                    best match respective age group characteristics, is designed
                    to cater entire banking needs of an individual.
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-settings"
                    role="tabpanel"
                    aria-labelledby="v-pills-settings-tab"
                  >
                    NMB Umanga Bachat is a unique and first of its kind product
                    exclusively offered to NMB customers. What's more, get
                    Delight Card to enjoy no cash withdrawal charge from any ATM
                    allover Nepal.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Khata;
