import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
           Node-React Website
          </NavLink>
          <ul>
          <li className="signin-button"><a className="btn" href="sign-in">SIGN IN / SIGN UP</a></li>
				</ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;