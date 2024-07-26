import "./textfield.css";
import React, { useState } from "react";
import { ErrorMessage, Field } from "formik";
import TextError from "../TextError/index";

const TextField = ({
  required,
  formikRequired,
  type,
  className,
  name,
  placeholder,
  label,
  isNotFormik,
  onChange,
  readOnly,
  disabled,
  autoFocus,
  onBlur,
  value,
}) => {
  return (
    <div className="common-textfield-wrapper ">
      {label && (
        <label htmlFor={label} className="text-left form-label">
          {label} {required && <strong className="text-danger">*</strong>}
        </label>
      )}
      <Field
        type={type}
        className={
          formikRequired
            ? "required-field form-control " + className
            : "form-control " + className
        }
        id={label}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={!disabled ? (disabled ? true : false) : false}
        readOnly={readOnly ? true : false}
      />
      {name === "notes" && (
        <i className="text-danger">
          *Note: Every note should be separated with period(.)
        </i>
      )}

      {!isNotFormik && <ErrorMessage name={name} component={TextError} />}
    </div>
  );
};

export default TextField;
