import React from "react";
import { Route, Routes } from "react-router-dom";
// import signin from "./Components/signin";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Forgetpassword from "./Components/Forgetpassword";
import Users from "./Components/Users";

class Sites extends React.Component {
    render() {
        return (
            <div>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/sign-up" element={<Signup/>} />
                    <Route exact path="/sign-in" element={<Signin/>} />
                    <Route exact path="/forget-password" element={<Forgetpassword />} />
                    <Route exact path="/users" element={<Users/>} />
                </Routes>
            </div>
        );
    }
}
export default Sites;