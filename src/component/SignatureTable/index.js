import React from "react";
import { useSelector } from "react-redux";
// import { imageConvertor } from "../../utils/imageConvertor";

const SignatureTable = () => {
  const accountSignatures = useSelector(
    (state) => state.registration.accountSignatures
  );
  return (
    <div className="table-responsive" style={{ marginTop: "3rem" }}>
      {/* <!--Table--> */}
      {accountSignatures?.length > 0 ? (
        <table className="table table-striped">
          {/* <!--Table head--> */}
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Account Number </th>
              <th>Name</th>
              <th>Type of Account</th>
              <th>Address</th>
              <th>First Signature</th>
              <th>Second Signature</th>
            </tr>
          </thead>
          {/* <!--Table head--> */}

          {/* <!--Table body--> */}
          <tbody>
            {accountSignatures?.length > 0 &&
              accountSignatures.map((application, i) => {
                const {
                  accountApplication,
                  accountDocumentsId,
                  signatureFile1,
                  // signatureText1,
                  signatureFile2,
                  // signatureText2,
                } = application;

                const {
                  firstName,
                  middleName,
                  lastName,
                  accountCategory,
                  permanentAddress,
                  accountApplicationId,
                } = accountApplication;
                return (
                  <tr key={accountDocumentsId}>
                    <td>{i + 1}</td>
                    <td>{accountApplicationId}</td>
                    <td>{firstName + " " + middleName + " " + lastName}</td>
                    <td>{accountCategory}</td>
                    <td>{permanentAddress}</td>
                    <td>
                      {}
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}${signatureFile1}`}
                        alt="first signature"
                        width="200px"
                        height="200px"
                      />
                    </td>
                    <td>
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}${signatureFile2}`}
                        alt="second signature"
                        width="200px"
                        height="200px"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
          {/* <!--Table body--> */}
        </table>
      ) : (
        <h3 className="text-center">No data found.</h3>
      )}
      {/* <!--Table--> */}
    </div>
  );
};

export default SignatureTable;
