import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplications } from "../../Redux/Auth/thunk";
import Loader from "../../component/Loader";
const Accounts = () => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.auth.applications);
  const loadingApplications = useSelector(
    (state) => state.auth.loadingApplications
  );

  useEffect(() => {
    dispatch(getApplications());
  }, []);
  return (
    <>
      {loadingApplications && <Loader />}
      <section className="form-wrapper">
        <div className="container-fluid">
          <div className="">
            <h1 className="text-center">Accounts</h1>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Account No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone No</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Fingerprint</th>
                  <th scope="col">Signatures</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((application, i) => {
                    const {
                      id,
                      accountNo,
                      name,
                      address,
                      phoneNo,
                      photo,
                      fingerprint,
                      signature,
                    } = application;
                    return (
                      <tr key={id}>
                        <td scope="row">{i + 1}</td>
                        <td>{accountNo}</td>
                        <td>{name}</td>
                        <td>{address === "" ? "N/A" : address}</td>
                        <td>{phoneNo}</td>
                        <td>
                          <label className="switch">
                            <input type="checkbox" checked={photo} readOnly />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={fingerprint}
                              readOnly
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={signature}
                              readOnly
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center">
                      <span style={{ fontSize: "1.2rem" }}>
                        No Application Found
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Accounts;
