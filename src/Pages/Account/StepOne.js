import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "../../component/TextError";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import Mandatory from "../../component/Mandatory";
const StepOne = ({ handleNextStep, initialValues, validationSchemaOne }) => {
  const branches = useSelector((state) => state.registration.branches);
  const onSubmit = (values) => {
    handleNextStep(values);
  };
  return (
    <>
      <section className="kyc-wrap account-open">
        <div className="container-fluid">
          <div className="kyc-details">
            <div className="kyc-block-2">
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchemaOne}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form autoComplete="off">
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
                          <div className="fade_rule"></div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group date">
                            <label htmlFor="text">
                              Salutation <Mandatory />
                            </label>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="salutation"
                                value="MR"
                                id="Mr"
                              />
                              <label className="form-check-label" htmlFor="Mr">
                                Mr.
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="salutation"
                                value="MRS"
                                id="Mrs"
                              />
                              <label className="form-check-label" htmlFor="Mrs">
                                Mrs.
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="salutation"
                                value="MISS"
                                id="Ms"
                              />
                              <label className="form-check-label" htmlFor="Ms">
                                Ms.
                              </label>
                            </div>
                            <ErrorMessage
                              name="salutation"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group date">
                            <label htmlFor="text">
                              select a accountCategory
                            </label>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="accountCategory"
                                id="diamond"
                                value="DIAMOND"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="diamond"
                              >
                                Diamond
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="accountCategory"
                                id="gold"
                                value="GOLD"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="gold"
                              >
                                Gold
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <Field
                                className="form-check-input"
                                type="radio"
                                name="accountCategory"
                                id="silver"
                                value="SILVER"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="silver"
                              >
                                Silver
                              </label>
                            </div>
                            <ErrorMessage
                              name="accountCategory"
                              component={TextError}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="firstName">
                              First Name <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                            />
                            <ErrorMessage
                              name="firstName"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="middleName">Middle Name </label>
                            <input
                              type="text"
                              name="middleName"
                              placeholder="Middle Name"
                            />
                            <ErrorMessage
                              name="middleName"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="lastName">
                              Last Name <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                            />
                            <ErrorMessage
                              name="lastName"
                              component={TextError}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="email">
                              Email <Mandatory />
                            </label>
                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                            />
                            <ErrorMessage name="email" component={TextError} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="mobileNo">
                              Mobile Number <Mandatory />
                            </label>
                            <Field
                              type="number"
                              name="mobileNo"
                              placeholder="Mobile Number"
                            />
                            <ErrorMessage
                              name="mobileNo"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="branch">
                              Branch <Mandatory />
                            </label>
                            <Field
                              as="select"
                              name="branch"
                              className="form-control"
                              value={formik.values.branch}
                              onChange={(e) => {
                                formik.setFieldValue("branch", e.target.value);
                              }}
                            >
                              <option
                                value=""
                                hidden
                                className="select-show custom-options "
                                style={{ color: "#888", fontSize: "16px" }}
                              >
                                Select
                              </option>
                              {branches?.length > 0 &&
                                branches.map((branch) => {
                                  const { branchId, branchAddress } = branch;
                                  return (
                                    <option
                                      value={branchId}
                                      className="custom-option"
                                      key={branchId}
                                    >
                                      {branchAddress}
                                    </option>
                                  );
                                })}
                            </Field>
                            <ErrorMessage name="branch" component={TextError} />
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group ">
                            <div className="permanent">
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                name="sameAddress"
                                id="exampleCheck-1"
                                checked={formik.values.sameAddress}
                                onClick={(e) => {
                                  if (e.target.checked === true) {
                                    formik.setFieldValue(
                                      "temporaryAddress",
                                      formik.values.permanentAddress
                                    );
                                  }

                                  formik.setFieldValue(
                                    "sameAddress",
                                    !e.target.value
                                  );
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleCheck-1"
                                // className="exampleCheck-1"
                              >
                                Both permanent and temporary address are same
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="permanentAddress">
                              Permanent Address <Mandatory />
                            </label>
                            <input
                              type="text"
                              name="permanentAddress"
                              placeholder="Permanent Address"
                              value={formik.values.permanentAddress}
                              onChange={(e) => {
                                if (formik.values.sameAddress === true) {
                                  formik.setFieldValue(
                                    "permanentAddress",
                                    e.target.value
                                  );
                                  formik.setFieldValue(
                                    "temporaryAddress",
                                    e.target.value
                                  );
                                } else {
                                  formik.setFieldValue(
                                    "permanentAddress",
                                    e.target.value
                                  );
                                }
                              }}
                            />
                            <ErrorMessage
                              name="permanentAddress"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group">
                            <label htmlFor="temporaryAddress">
                              Temporary Address <Mandatory />
                            </label>
                            <Field
                              type="text"
                              name="temporaryAddress"
                              placeholder="Temporary Address"
                            />
                            <ErrorMessage
                              name="temporaryAddress"
                              component={TextError}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                          <div className="form-group date">
                            <label htmlFor="dateOfBirthAd">
                              Date of Birth <Mandatory />
                            </label>
                            {/* <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="option1"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineRadio1"
                              >
                                A.D
                              </label>
                            </div> */}
                            {/* <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="option2"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="inlineRadio2"
                              >
                                B.S
                              </label>
                            </div> */}
                            {/* <div className="form-check  "> */}
                            <DatePicker
                              name="dateOfBirthAd"
                              selected={formik.values.dateOfBirthAd}
                              showMonthDropdown
                              showYearDropdown
                              dateFormat="yyyy/MM/dd"
                              placeholderText="YYYY-MM-DD"
                              dropdownMode="select"
                              // className="form-control"
                              onChange={(date) => {
                                formik.setFieldValue("dateOfBirthAd", date);
                              }}
                            />
                            {/* </div> */}
                            <ErrorMessage
                              name="dateOfBirthAd"
                              component={TextError}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="site-button">
                            <button
                              type="submit"
                              className="site-button-"
                              // onClick={handleSubmit}
                            >
                              Next
                            </button>
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
    </>
  );
};

export default StepOne;
