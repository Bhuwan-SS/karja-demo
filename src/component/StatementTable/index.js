import React, { useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
const StatementModal = lazy(() => import("../../Modal/StatementModal"));
const StatementTable = () => {
  const statements = useSelector((state) => state.registration.statements);
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="table-responsive" style={{ marginTop: "3rem" }}>
        {/* <!--Table--> */}
        {statements?.length > 0 ? (
          <table className="table table-striped">
            {/* <!--Table head--> */}
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Account Number </th>
                <th>Name</th>
                <th>Type of Account</th>
                <th>Address</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            {/* <!--Table head--> */}

            {/* <!--Table body--> */}
            <tbody>
              {statements?.length > 0 &&
                statements.map((application, i) => {
                  const { accountApplication, endDate, startDate, id } =
                    application;
                  const {
                    firstName,
                    middleName,
                    lastName,
                    accountCategory,
                    permanentAddress,
                    accountApplicationId,
                  } = accountApplication;
                  return (
                    <tr key={id}>
                      <td>{i + 1}</td>
                      <td>{accountApplicationId}</td>
                      <td>{firstName + " " + middleName + " " + lastName}</td>
                      <td>{accountCategory}</td>
                      <td>{permanentAddress}</td>
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                    </tr>
                  );
                })}
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
          <StatementModal showModal={showModal} setShowModal={setShowModal} />
        </Suspense>
      )}
    </>
  );
};

export default StatementTable;
