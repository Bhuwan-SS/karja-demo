import React, { useState, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { registrationConstants } from "../../Redux/Registration/constants";
import { useDispatch } from "react-redux";
const SidebarEdit = lazy(() => import("../../component/Sidebar/SidebarEdit"));
const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.registration.applications);
  const searchedApplications = useSelector(
    (state) => state.registration.searchedApplications
  );
  const searchText = useSelector((state) => state.registration.searchText);
  const handleEdit = (id) => {
    setShowModal(true);
    dispatch({ type: registrationConstants.ACCOUNT_EDIT_SUCCESS, payload: id });
  };
  return (
    <>
      <div className="table-responsive" style={{ marginTop: "3rem" }}>
        {/* <!--Table--> */}
        <table className="table table-striped">
          {/* <!--Table head--> */}
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Account Number</th>
              <th>Name</th>
              <th>Type of Account</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Email</th>
              {/* <th>Remarks</th> */}
              <th></th>
            </tr>
          </thead>
          {/* <!--Table head--> */}

          {/* <!--Table body--> */}
          <tbody>
            {searchedApplications?.length === 0 && searchText.length === 0
              ? applications.map((application, i) => {
                  const {
                    accountApplicationId,
                    firstName,
                    middleName,
                    lastName,
                    accountCategory,
                    permanentAddress,
                    mobileNo,
                    applicationStatus,
                    email,
                  } = application;
                  return (
                    <tr key={accountApplicationId}>
                      <td>{i + 1}</td>
                      <td>{accountApplicationId}</td>
                      <td>{firstName + " " + middleName + " " + lastName}</td>
                      <td>{accountCategory}</td>
                      <td>{permanentAddress}</td>
                      <td>{mobileNo}</td>
                      <td>{applicationStatus}</td>
                      <td>{email}</td>
                      {/* <td>This is remark for test, dashboard for Wacom tablet.</td> */}
                      {applicationStatus === "PENDING" && (
                        <td>
                          <i
                            className="las la-edit"
                            onClick={() => handleEdit(accountApplicationId)}
                          ></i>
                        </td>
                      )}
                    </tr>
                  );
                })
              : searchedApplications.map((application, i) => {
                  const {
                    accountApplicationId,
                    firstName,
                    middleName,
                    lastName,
                    accountCategory,
                    permanentAddress,
                    mobileNo,
                    applicationStatus,
                    email,
                  } = application;
                  return (
                    <tr key={accountApplicationId}>
                      <td>{i + 1}</td>
                      <td>{accountApplicationId}</td>
                      <td>{firstName + " " + middleName + " " + lastName}</td>
                      <td>{accountCategory}</td>
                      <td>{permanentAddress}</td>
                      <td>{mobileNo}</td>
                      <td>{applicationStatus}</td>
                      <td>{email}</td>
                      {/* <td>This is remark for test, dashboard for Wacom tablet.</td> */}
                      {applicationStatus === "PENDING" && (
                        <td>
                          <i
                            className="las la-edit"
                            onClick={() => handleEdit(accountApplicationId)}
                          ></i>
                        </td>
                      )}
                    </tr>
                  );
                })}
          </tbody>
          {/* <!--Table body--> */}
        </table>
        {/* <!--Table--> */}
      </div>
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarEdit showModal={showModal} setShowModal={setShowModal} />
        </Suspense>
      )}
    </>
  );
};

export default Table;
