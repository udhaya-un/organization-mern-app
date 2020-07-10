import React from "react";
import "./header.scss";
import dictionary from "../../../config/static/Dictionary";
import logo from "../../../assets/images/logo.png";
import { onLogout } from "../../../services/auth";

function Header(props) {
  const { loggedIn, userData, isCompany } = props;

  return loggedIn ? (
    <div className="header">
      <span className="headerLeft">
        <img src={logo} alt="Organization Management" height="50px" />
        Organization Management
      </span>
    </div>
  ) : (
    <div className="headerNotLoggedIn">Organization Management</div>
  );
}

export default Header;

// <span className="headerRight">
// <span className="headerText">User</span>
// <a onClick={onLogout}>{dictionary.LOGOUT_LABEL}</a>
// </span>
