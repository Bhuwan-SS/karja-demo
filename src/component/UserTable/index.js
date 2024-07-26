import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userConstants } from "../../Redux/User/constants";
const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const history = useHistory();
  return (
    <>
      <div className="table-responsive" style={{ marginTop: "3rem" }}>
        {/* <!--Table--> */}
        {users?.length > 0 ? (
          <>
            <div className="text-right mr-5 mb-2">
              <button
                className="btn btn-primary "
                onClick={() => {
                  history.push("/create-user");
                  dispatch({ type: userConstants.CLEAR_IMAGE_GALLERY });
                }}
              >
                Add
              </button>
            </div>
            <table className="table table-striped">
              {/* <!--Table head--> */}
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Date of Birth </th>
                  <th>UserName</th>
                </tr>
              </thead>
              {/* <!--Table head--> */}

              {/* <!--Table body--> */}
              <tbody>
                {users?.length > 0 &&
                  users.map((user, i) => {
                    const {
                      userId,
                      firstName,
                      middleName,
                      lastName,
                      email,
                      userName,
                      permanentAddress,
                      dateOfBirthAd,
                    } = user;
                    return (
                      <tr key={userId}>
                        <td>{i + 1}</td>
                        <td>{firstName + " " + middleName + " " + lastName}</td>
                        <td>{permanentAddress}</td>
                        <td>{email}</td>
                        <td>{dateOfBirthAd}</td>
                        <td>{userName}</td>
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
          </>
        ) : (
          <h3 className="text-center">
            No data found. Please{" "}
            <span>
              <button
                className="btn btn-primary"
                onClick={() => history.push("/create-user")}
              >
                Add
              </button>
            </span>{" "}
            Some
          </h3>
        )}
        {/* <!--Table--> */}
      </div>
    </>
  );
};

export default UserTable;
