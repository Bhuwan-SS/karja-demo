import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import headerImg from "../../img/m_header.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/thunk";
import { registrationConstants } from "../../Redux/Registration/constants";
const Header = () => {
  const [search, setSearch] = useState("");
  const applications = useSelector((state) => state.registration.applications);
  const userName = useSelector((state) => state.auth.userName);
  const userId = useSelector((state) => state.auth.userId);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    document.querySelector("body").classList.add("sidebar-is-reduced");
  });
  const handleLogout = async () => {
    const result = await dispatch(logout());
    if (result) {
      history.push("/");
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);

    const filteredData = applications.filter(
      (application) =>
        application.accountApplicationId
          .toString()
          .includes(e.target.value.toLowerCase()) ||
        application.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        application.mobileNo.toString().includes(e.target.value)
    );
    dispatch({
      type: registrationConstants.SEARCH_SUCCESS,
      payload: { data: filteredData, search: e.target.value },
    });
  };
  return (
    // <div className="sidebar-is-reduced">
    <header className="l-header">
      <div className="l-header__inner clearfix">
        <div className="c-header-icon js-hamburger">
          <div className="hamburger-toggle">
            <span className="bar-top"></span>
            <span className="bar-mid"></span>
            <span className="bar-bot"></span>
          </div>
        </div>
        <div className="c-header-icon has-dropdown">
          <img src={logo} alt="logo" />
        </div>
        <div className="header-icons-group">
          <div className="has-search form-group">
            <i className="las la-search"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e)}
              className=" c-search__input u-input"
              placeholder="Search Account Holder"
            />
          </div>
          <div className="header-user-info">
            <div className="user-img">
              <img className="img-fluid" src={headerImg} alt="headerImg" />
            </div>
            <div className="user-info">
              <h5>{userName}</h5>
              <p>{userId}</p>
            </div>
          </div>
          <div className="c-header-icon logout" onClick={handleLogout}>
            <i className="las la-sign-out-alt"></i>
          </div>
        </div>
      </div>
    </header>
    // </div>
  );
};

export default Header;
