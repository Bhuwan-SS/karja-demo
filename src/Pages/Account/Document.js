import React, { useState, useEffect } from "react";
import Select from "react-select";
import Stomp from "stompjs";
import SockJs from "sockjs-client";
import { ErrorMessage } from "formik";
const Document = ({
  documentType,
  setDocumentType,
  documentFront,
  setDocumentFront,
  documentBack,
  setDocumentBack,
  documentError,
}) => {
  const [img, setImg] = useState("");
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "100%",
      minHeight: "43px",
      backgroundColor: state.isDisabled ? "#00000" : "#ffffff",
    }),
  };
  const documentTypes = [
    { id: "CITIZENSHIP", value: "CITIZENSHIP" },
    { id: "PASSPORT", value: "PASSPORT" },
    { id: "DRIVING_LICENSE", value: "DRIVING_LICENSE" },
    { id: "NID", value: "NID" },
    { id: "OTHERS", value: "OTHERS" },
  ];

  useEffect(() => {
    const socket = new SockJs(`${process.env.REACT_APP_BASE_URL}socket`);
    const client = Stomp.over(socket);
    client.connect(
      {},
      () => {
        client.subscribe("/topic/messages", async (message) => {
          console.log(message,"mm")
          const data = await message.body;
          setImg(`data:image/png;base64,${data}`);
        });
      },
      (error) => {
        console.error("WebSocket connection failed:", error);
      }
    );
  }, []);

  useEffect(() => {
    if (img !== "" && documentFront === "") {
      setDocumentFront(img);
    } else if (img !== "" && documentBack === "") {
      setDocumentBack(img);
    }
    setImg("");
  }, [img]);

  const handleFrontDelete = () => {
    setDocumentFront("");
  };
  const handleBackDelete = () => {
    setDocumentBack("");
  };
  return (
    <div className="d-flex  flex-column align-items-center">
      <div className="  bg-white d-flex align-items-center flex-column rounded p-4  ">
        <div className="form-group ">
          <label htmlFor="documentType " className="m-0 label text-left">
            Document Type:
          </label>
          <Select
            styles={customStyles}
            className="common-async-select-wrapper"
            type="text"
            name="documentType"
            value={documentType}
            options={documentTypes}
            getOptionLabel={(option) => option?.value}
            getOptionValue={(option) => option?.id}
            onChange={(selected) => {
              setDocumentType(selected);
            }}
            isClearable="true"
            isSearchable="true"
          />
          <ErrorMessage name="documentType" component="div" />
        </div>
        <div className="d-flex justify-content-center" style={{ gap: "6px" }}>
          <div>
            <p className="m-0">Front:</p>
            <div
              className="image border w-100 d-flex"
              style={{
                height: "180px",
                background: "white",
                borderRadius: "4px",
              }}
            >
              {documentFront ? (
                <img
                  src={documentFront}
                  alt="documentFront"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "180px",
                    width: "280px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <p>Place document on the scanner</p>
                </div>
              )}
            </div>
            {documentFront && (
              <button
                className="btn btn-danger btn-sm  w-100 mt-0"
                onClick={handleFrontDelete}
              >
                Delete
              </button>
            )}
          </div>
          <div>
            <p className="m-0">Back: </p>
            <div
              className="image border w-100 d-flex"
              style={{
                height: "180px",
                background: "white",
                borderRadius: "4px",
              }}
            >
              {documentBack ? (
                <img
                  src={documentBack}
                  alt="documentBack"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    height: "180px",
                    width: "280px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  <p>Place document on the scanner</p>
                </div>
              )}
            </div>
            {documentBack && (
              <button
                className="btn btn-danger btn-sm  w-100 mt-0"
                onClick={handleBackDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      {documentError && (
        <div className="text-left">
          <h4 style={{ color: "red" }}>Required!</h4>
        </div>
      )}
    </div>
  );
};

export default Document;
