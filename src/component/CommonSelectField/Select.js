import "./select.css";
import React, { lazy } from "react";
// import Select from "react-select";
import { ErrorMessage } from "formik";
import TextError from "../TextError/TextError";
const Select = lazy(() => import("react-select"));

// custom styles for react-select
const customStyles = (numSelected) => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? "#edf1fb" : "#ffffff",
    maxHeight: "60px",
    overflowY: numSelected > 1 ? "scroll" : "hidden", // Enable vertical scrolling conditionally
  }),
});

const SelectField = ({
  label,
  required,
  formikRequired,
  value,
  name,
  className,
  options,
  onChange,
  autoFocus,
  isNotFormik,
  isDisabled,
  getOptionLabel,
  getOptionValue,
  isMulti,
  placeholder,
  onBlur,
  components = null,
}) => {
  const isScrollable = value && value.length > 2;

  return (
    <div className="select-field-wrapper">
      <label htmlFor={label} className="form-label">
        {label} {required && <strong className="text-danger">*</strong>}
      </label>
      <Select
        value={value}
        styles={customStyles(value?.length)}
        isClearable="true"
        isSearchable="true"
        placeholder={placeholder ? placeholder : "Select..."}
        isMulti={isMulti}
        name={name}
        required
        className={
          formikRequired
            ? "required-field select-field " + className
            : "select-field " + className
        }
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        options={options}
        onChange={onChange}
        autoFocus={autoFocus}
        isDisabled={isDisabled ? true : false}
        onBlur={onBlur}
        components={components}
      />
      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default SelectField;
