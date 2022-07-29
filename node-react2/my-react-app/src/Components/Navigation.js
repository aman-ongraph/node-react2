import React from "react";
import { NavLink } from "react-router-dom";
import Users from "./Users";
import Logout from "./Logout";
import { useState } from "react";
function Navigation() {
 // const [loggedIn, isLoggedIn] = useState(false)
	

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

/* const [loggedIn, isLoggedIn] = useState(false)
  let allLinks;
	if(loggedIn){
    allLinks =   `<Users style={{color : 'white', textDecoration: 'underline', cursor: 'pointer' }}/>
     <Logout style={{color : 'white', textDecoration: 'underline', cursor: 'pointer' }}/>`;
  }else{
     allLinks =<ul><li className="signin-button"><a className="btn" href="sign-in">SIGN IN / SIGN UP</a></li></ul> ;
  } */