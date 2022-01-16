import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
    //  console.log(this.state.input.email);
     // console.log(fetch("http://localhost:4000/api/auth/login"));

     //Call API which generates authentication token
       try {
        let res =  fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: this.state.input.email,
            password: this.state.input.password,
          }),
        });
      } catch (error) {
        console.log(`error occured : `, error)
      }
 
     /*  let input = {};
      input["email"] = "";
      input["password"] = "";
      this.setState({ input: input }); */
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your Email Address.";
    }

    if (typeof input["email"] !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid Email address.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    this.setState({
      errors: errors
    });

    return isValid;
  }
  render() {
    return (

      <div className="container">
        <div className="row">
          <article className="col-xs-12 maincontent">
            <header className="page-header">
              <h1 className="page-title">Sign in</h1>
            </header>

            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h3 className="thin text-center">Sign in to your account</h3>
                  <p className="text-center text-muted">No Account? <Link to="/sign-up">Register</Link></p>
                  <hr />

                  <form action="/home" method="POST" onSubmit={this.handleSubmit}>
                    <div className="top-margin">
                      <label>Email<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={this.state.input.email}
                        onChange={this.handleChange}
                      />
                      <div className="text-danger">{this.state.errors.email}</div>
                    </div>
                    <div className="top-margin">
                      <label>Password <span className="text-danger">*</span></label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={this.state.input.password}
                        onChange={this.handleChange}
                      />
                      <div className="text-danger">{this.state.errors.password}</div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-lg-8">
                        <b><Link to="/forget-password">Forget password?</Link></b>
                      </div>
                      <div className="col-lg-4 text-right">
                        <button className="btn btn-action" type="submit">Sign in</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </article>

        </div>
      </div>
    );
  }
}
export default Signin;