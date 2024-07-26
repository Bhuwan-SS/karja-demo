import React, { useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
const ChequeModal = lazy(() => import("../../Modal/ChequeModal"));
const ChequeTable = () => {
  const cheques = useSelector((state) => state.registration.cheques);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="table-responsive" style={{ marginTop: "3rem" }}>
        {/* <!--Table--> */}

        {cheques?.length > 0 ? (
          <table className="table table-striped">
            {/* <!--Table head--> */}
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Account Number </th>
                <th>Name</th>
                <th>Type of Account</th>
                <th>Address</th>
                <th>Cheque Leaves</th>
              </tr>
            </thead>
            {/* <!--Table head--> */}

            {/* <!--Table body--> */}
            <tbody>
              {cheques?.length > 0 &&
                cheques.map((application, i) => {
                  const { accountApplication, id, leaves } = application;
                  const {firstName,middleName,lastName,accountApplicationId,accountCategory,permanentAddress}=accountApplication
                  return (
                    <tr key={id}>
                      <td>{i + 1}</td>
                      <td>{accountApplicationId}</td>
                      <td>{firstName + " " + middleName + " " + lastName}</td>
                      <td>{accountCategory}</td>
                      <td>{permanentAddress}</td>
                      <td>{leaves}</td>
                    </tr>
                  );
                })}

              {/* <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td> 
                <td></td>
                <td></td>
                <td>
                  <span>
                    Rows Per Pages{" "}
                    <em>
                      5<i className="las la-caret-down"></i>
                    </em>
                  </span>
                </td>
                <td colSpan="2">
                  <span>1-8 of 1240</span>
                  <a href="!#">
                    <i className="las la-angle-left"></i>
                  </a>
                  <a href="!#">
                    <i className="las la-angle-right"></i>
                  </a>
                </td>
              </tr> */}
            </tbody>
            {/* <!--Table body--> */}
          </table>
        ) : (
          <h3 className="text-center">
            No data found. Please{" "}
            <span>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Add
              </button>
            </span>{" "}
            Some
          </h3>
        )}
        {/* <!--Table--> */}
      </div>
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChequeModal showModal={showModal} setShowModal={setShowModal} />
        </Suspense>
      )}
    </>
  );
};

export default ChequeTable;
