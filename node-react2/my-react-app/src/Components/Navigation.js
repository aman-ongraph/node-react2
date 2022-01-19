import React from "react";
import { NavLink } from "react-router-dom";
import Users from "./Users";
import Logout from "./Logout";
function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
           Node-React
          </NavLink>
          <Users style={{color : 'white', textDecoration: 'underline', cursor: 'pointer' }}/>
          <Logout style={{color : 'white', textDecoration: 'underline', cursor: 'pointer' }}/>
          <ul><li className="signin-button"><a className="btn" href="sign-in">SIGN IN / SIGN UP</a></li></ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;