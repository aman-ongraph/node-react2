import React from "react";
import User from "./User";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="align-items-center">
          <div className="col-lg-12">
            <h1 className="font-weight-light">Home</h1>
            <div className="home_para">
                  <User/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;