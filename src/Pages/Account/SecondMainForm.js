import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AsyncPaginate } from "react-select-async-paginate";
import TextField from "../../component/CommonTextField/TextField";
import AsyncSelect from "../../component/CommonAsyncSelectField/AsyncSelect";
const SecondMainFrame = ({ formik, setValue, value }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "100%",
      minHeight: "43px",
      backgroundColor: state.isDisabled ? "#00000" : "#ffffff",
    }),
  };

  return (
    <div className="d-flex  flex-column align-items-center">
      <div className="row bg-white form-group form-wrapper rounded p-4 main-step">
      
        <div className=" col-6">
          <TextField
            type="text"
            name="fatherName"
            label="Father Name"
            formikRequired={
              formik?.errors?.fatherName && formik?.touched?.fatherName
            }
            onChange={(e) => {
              formik.setFieldValue("fatherName", e.target.value);
            }}
          />{" "}
        </div>
        <div className=" col-6">
          <TextField
            type="text"
            name="motherName"
            label="Mother Name"
            formikRequired={
              formik?.errors?.motherName && formik?.touched?.motherName
            }
            onChange={(e) => {
              formik.setFieldValue("motherName", e.target.value);
            }}
          />{" "}
        </div>

        {/* <div className=" col-4">
          <TextField
            type="text"
            name="contact"
            label="Contact"
            formikRequired={formik?.errors?.contact && formik?.touched?.contact}
            onChange={(e) => {
              formik.setFieldValue("contact", e.target.value);
            }}
          />
        </div> */}

        {/* <div className=" col-2">
          <label htmlFor="province " className="m-0 label text-left">
            Province:
          </label>
          <AsyncPaginate
            styles={customStyles}
            className="common-async-select-wrapper"
            type="text"
            name="province"
            isMulti={false}
            value={value}
            isClearable="true"
            isSearchable="true"
          />
          <ErrorMessage name="province" component="div" />
        </div> */}
        {/* <div className=" col-2">
          <AsyncSelect
            label="District"
            value={formik?.values?.district}
            name={"district"}
            required
            formikRequired={
              formik?.errors?.district && formik?.touched?.district
            }
            onChange={(select) => {
              formik.setFieldValue("district", select);
            }}
            getOptionLabel={(option) => `${option?.name}`}
            getOptionValue={(option) => `${option?.id}`}
            loadOptions={}
            additional={{ offset: 0, limit: 10 }}
          />
        </div> */}
        {/* <div className=" col-2">
          <label htmlFor="district " className="m-0 label text-left">
            District:
          </label>
          <AsyncPaginate
            styles={customStyles}
            className="common-async-select-wrapper"
            type="text"
            name="district"
            isMulti={false}
            value={value}
            isClearable="true"
            isSearchable="true"
          />
          <ErrorMessage name="district" component="div" />
        </div> */}
        {/* <div className=" col-2">
          <TextField
            type="text"
            name="palika"
            label="Palika"
            formikRequired={formik?.errors?.palika && formik?.touched?.palika}
            onChange={(e) => {
              formik.setFieldValue("palika", e.target.value);
            }}
          />
        </div> */}
        {/* <div className=" col-2">
          <TextField
            type="text"
            name="ward"
            label="Ward No."
            formikRequired={formik?.errors?.ward && formik?.touched?.ward}
            onChange={(e) => {
              formik.setFieldValue("ward", e.target.value);
            }}
          />
        </div> */}
        {/* <div className=" col-4">
          <TextField
            type="text"
            name="address"
            label="Address"
            formikRequired={formik?.errors?.address && formik?.touched?.address}
            onChange={(e) => {
              formik.setFieldValue("address", e.target.value);
            }}
          />
        </div> */}
      </div>
      {/* <div className="prev-next-btn-wrapper ">
        <button
          className="btn-next "
          onClick={() => {
            setValue(0);
          }}
        >
          Previous
        </button>
        <button
          className="btn-next "
          onClick={() => {
            setValue(2);
          }}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default SecondMainFrame;
