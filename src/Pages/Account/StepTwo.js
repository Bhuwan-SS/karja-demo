import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../component/TextError";
import DatePicker from "react-datepicker";
import Mandatory from "../../component/Mandatory";
import { useSelector } from "react-redux";
import Loader from "../../component/Loader";
import pdf from "./asd.pdf";
// import "../../css/stepTwo.css";
const StepTwo = ({
  initialValues,
  validationSchemaTwo,
  handleNextStep,
  handlePreviousStep,
  lock,
}) => {
  const loading = useSelector((state) => state.registration.loading);
  const [check, setCheck] = useState(true);
  const onSubmit = (values) => {
    handleNextStep(values, true);
  };
  // const readURL = (input) => {
  //   if (input.files && input.files[0]) {
  //     var reader = new FileReader();

  //     reader.onload = function (e) {
  //       $(".account-open-2 .image-upload-wrap").hide();

  //       $(".account-open-2 .file-upload-image").attr("src", e.target.result);
  //       $(".account-open-2 .file-upload-content").show();

  //       $(".account-open-2 .image-title").html(input.files[0].name);
  //     };

  //     reader.readAsDataURL(input.files[0]);
  //   } else {
  //     removeUpload();
  //   }
  // };

  // const removeUpload = () => {
  //   $(".account-open-2 .file-upload-input").replaceWith(
  //     $(".account-open-2 .file-upload-input").clone()
  //   );
  //   $(".account-open-2 .file-upload-content").hide();
  //   $(".account-open-2 .image-upload-wrap").show();
  // };
  // $(".account-open-2 .image-upload-wrap").bind("dragover", function () {
  //   $(".account-open-2 .image-upload-wrap").addClass("image-dropping");
  // });
  // $(".account-open-2 .image-upload-wrap").bind("dragleave", function () {
  //   $(".account-open-2 .image-upload-wrap").removeClass("image-dropping");
  // });

  useEffect(() => {
    $(".dropify").dropify();

    // left-kyc-dropify

    $(".left-dropify").dropify();

    $(".right-dropify").dropify();

    $(".sign-dropify").dropify();

    // open-2

    $(".back-dropify").dropify();

    $(".right-dropify").dropify();
  }, []);
  const clickFront = () => {
    $(".image-upload-wrap .dropify-wrapper").toggleClass("d-block");
  };
  const clickBack = () => {
    $(".file-upload > .dropify-wrapper").toggleClass("d-block");
  };
  return (
    <>
      <section className="kyc-wrap account-open account-open-2">
        <div className="container-fluid">
          <div className="kyc-details">
            <div className="kyc-block-2">
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchemaTwo}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form autoComplete="off" className="kyc-form">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="fade-wrap">
                            <div className="fade-text">
                              <h2>Step1: Personal Information</h2>
                            </div>
                            <div className="fade-text">
                              <h2>Step2: Documents</h2>
                            </div>
                          </div>
                          <div className="loader">
                            <span className="loader-bar"></span>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="identificationType">
                              Identification Type <Mandatory />
                            </label>
                            <select
                              name="identificationType"
                              className="form-control"
                              value={formik.values.identificationType}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  "identificationType",
                                  e.target.value
                                )
                              }
                            >
                              <option
                                defaultValue=""
                                className="select-show custom-options "
                                style={{ color: "#888", fontSize: "16px" }}
                              >
                                Select
                              </option>
                              <option
                                value="CITIZENSHIP"
                                className="custom-option"
                              >
                                Citizenship
                              </option>
                              <option
                                value="DRIVING_LICENCE"
                                className="custom-option"
                              >
                                Driving Licence
                              </option>
                              <option
                                value="PASSPORT"
                                className="custom-option"
                              >
                                Passport
                              </option>
                            </select>
                            <ErrorMessage
                              name="identificationType"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="identificationNo">
                              Identification Document Number <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="identificationNo"
                              placeholder="Identification Number in Your Document"
                            />
                            <ErrorMessage
                              name="identificationNo"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="issuedDateAd">
                              Issued Date <Mandatory />
                            </label>
                            <DatePicker
                              name="dob"
                              selected={formik.values.issuedDateAd}
                              showMonthDropdown
                              showYearDropdown
                              dateFormat="yyyy/MM/dd"
                              placeholderText="YYYY-MM-DD"
                              dropdownMode="select"
                              className="form-control"
                              onChange={(date) => {
                                formik.setFieldValue("issuedDateAd", date);
                              }}
                            />
                            <ErrorMessage
                              name="issuedDateAd"
                              component={TextError}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label htmlFor="issuedPlace">
                              Issued Place <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="issuedPlace"
                              placeholder="Issued Place"
                            />
                            <ErrorMessage
                              name="issuedPlace"
                              component={TextError}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                          <div className="form-group img-upload">
                            <label htmlFor="idFrontFile">
                              Upload Front <Mandatory />
                            </label>
                            <div className="file-upload">
                              <button
                                className="file-upload-btn front"
                                type="button"
                                onClick={clickFront}
                              >
                                Upload Front page
                              </button>

                              <div className="image-upload-wrap">
                                <input
                                  type="file"
                                  className="right-dropify"
                                  name="idFrontFile"
                                  onChange={(e) =>
                                    formik.setFieldValue(
                                      "idFrontFile",
                                      e.target.files[0]
                                    )
                                  }
                                />
                                <ErrorMessage
                                  name="idFrontFile"
                                  component={TextError}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group img-upload">
                            <label htmlFor="idBackFile">
                              Upload Back <Mandatory />
                            </label>
                            <div className="file-upload">
                              <button
                                className="file-upload-btn back"
                                type="button"
                                onClick={clickBack}
                              >
                                Upload Back page
                              </button>

                              <input
                                type="file"
                                name="idBackFile"
                                className="back-dropify"
                                onChange={(e) =>
                                  formik.setFieldValue(
                                    "idBackFile",
                                    e.target.files[0]
                                  )
                                }
                              />
                              <ErrorMessage
                                name="idBackFile"
                                component={TextError}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group ">
                            <div className="permanent">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="exampleCheck-1"
                                value={check}
                                onClick={(e) => {
                                  e.target.checked === false
                                    ? setCheck(true)
                                    : setCheck(false);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheck-1"
                                // className="exampleCheck-1"
                              >
                                I have read and agree to the{" "}
                                <a href={pdf} target="_blank">
                                  Terms & Conditions
                                </a>{" "}
                                of NMB Bank Ltd.
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="captcha-wrap">
                            {/* <div
                            className="g-recaptcha"
                            data-sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ"
                          ></div> */}
                            <div className="site-button">
                              <button
                                type="button"
                                className="site-button- mr-4"
                                onClick={() =>
                                  handlePreviousStep(formik.values)
                                }
                              >
                                Back
                              </button>
                              <button
                                type="submit"
                                className={`${
                                  check === true
                                    ? "site-button-disabled"
                                    : "site-button-"
                                }`}
                                disabled={check && lock}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      {loading && <Loader />}
    </>
  );
};

export default StepTwo;
