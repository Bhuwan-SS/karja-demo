import React from "react";
import { NavLink, useHistory } from "react-router-dom";
const Sidebar = () => {
  const history = useHistory();
  return (
    <div className="l-sidebar">
      <div className="logo">
        <div className="logo__txt">D</div>
        <div className=" logo__txt-1">Dashboard</div>
      </div>
      <div className="l-sidebar__content">
        <nav className="c-menu js-menu">
          <ul className="u-list">
            <li
              className="c-menu__item is-active"
              // data-toggle="tooltip"
              // title="Accounts"
              onClick={() => history.push("/")}
            >
              <div className="c-menu__item__inner">
                <i className="las la-chart-pie"></i>
                <div className="c-menu-item__title">
                  <NavLink to="/">
                    <span>Account Requests</span>
                  </NavLink>
                </div>
              </div>
            </li>
            <li
              className="c-menu__item has-submenu"
              // data-toggle="tooltip"
              // title="Statement Requests"
              onClick={() => history.push("/statement")}
            >
              <div className="c-menu__item__inner">
                <i className="las la-database"></i>
                <div className="c-menu-item__title">
                  <NavLink to="/statement">
                    <span>Statement Requests</span>
                  </NavLink>
                </div>
              </div>
            </li>
            <li
              className="c-menu__item has-submenu"
              onClick={() => history.push("/cheque")}
            >
              <div className="c-menu__item__inner">
                <i className="las la-database"></i>
                <div className="c-menu-item__title">
                  <NavLink to="/cheque">
                    <span>Cheque Requests</span>
                  </NavLink>
                </div>
              </div>
            </li>
            <li
              className="c-menu__item has-submenu"
              // data-toggle="tooltip"
              // title="User Listing"
              onClick={() => history.push("/user")}
            >
              <div className="c-menu__item__inner">
                <i className="las la-database"></i>
                <div className="c-menu-item__title">
                  <NavLink to="/user">
                    <span>User Listing</span>
                  </NavLink>
                </div>
              </div>
            </li>
            <li
              className="c-menu__item has-submenu"
              // data-toggle="tooltip"
              // title="User Listing"
              onClick={() => history.push("/signature")}
            >
              <div className="c-menu__item__inner">
                <i className="las la-database"></i>
                <div className="c-menu-item__title">
                  <NavLink to="/signature">
                    <span>Signature Listing</span>
                  </NavLink>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
