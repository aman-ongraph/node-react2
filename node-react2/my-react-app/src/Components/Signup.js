import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      input: {}, 
      errors: {},
      message:{}
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
    //alert('A name was submitted: ' + this.state.input.firstname);
    if (this.validate()) {

       //Call API which generates authentication token
       try {
        let res =  fetch("http://localhost:4000/register", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            firstname: this.state.input.firstname, 
            lastname: this.state.input.lastname,
            email: this.state.input.email, 
            password: this.state.input.password,
            cpassword: this.state.input.cpassword,
          }),
        })
        .then(res => res.json())
          .then(newres => {
            console.log(newres)
            if(newres.success===true){
              let message = {};
              message["msg"] = "User registration successful";
              this.setState({
                message: message
              }) 
              setTimeout(()=>{this.setState({message: "" })  }, 3000);
            }
            else{
              let message = {};
              message["msg"] = newres.data;
              this.setState({
                message: message
              }) 
              setTimeout(()=>{this.setState({message: "" })  }, 3000);
            }

          })
      } catch (error) {
        console.log(`error occured : `, error)
      }
     /*  this.props.history.push('/register');
      let input = {};
      input["firstname"] = "";
      input["lastname"] = "";
      input["email"] = "";
      input["password"] = "";
      input["cpassword"] = "";
      this.setState({ input: input }); */
    }else{

      event.preventDefault();
    }
  }

  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["firstname"]) {
      isValid = false;
      errors["firstname"] = "Please enter your First Name.";
    }
    if (!input["lastname"]) {
      isValid = false;
      errors["lastname"] = "Please enter your Last Name.";
    }

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

    if (!input["cpassword"]) {
      isValid = false;
      errors["cpassword"] = "Please enter your confirm password.";
    }

    if (typeof input["password"] !== "undefined" && typeof input["cpassword"] !== "undefined") {

      if (input["password"] != input["cpassword"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
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
              <h1 className="page-title">Sign up</h1>
            </header>
            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <div className="panel panel-default">
                <div className="panel-body">  
                  <h3 className="thin text-center">Register a new account</h3>
                  <hr />
                  <h3 className='successmsg text-center'>{this.state.message.msg}</h3>
                  <form action="#" method="POST" onSubmit={this.handleSubmit}>
                    <div className="top-margin">
                      <label>First Name<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        placeholder="Enter your FirstName"
                        value={this.state.input.firstname}
                        onChange={this.handleChange}
                      />
                      <div className="text-danger">{this.state.errors.firstname}</div>
                    </div>
                    <div className="top-margin">
                      <label>Last Name<span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        placeholder="Enter your LastName"
                        value={this.state.input.lastname}
                        onChange={this.handleChange}
                      />
                      <div className="text-danger">{this.state.errors.lastname}</div>
                    </div>
                    <div className="top-margin">
                      <label>Email Address <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter your Email"
                        value={this.state.input.email}
                        onChange={this.handleChange}
                      />
                      <div className="text-danger">{this.state.errors.email}</div>
                    </div>
                    <div className="row top-margin">
                      <div className="col-sm-6">
                        <label>Password <span className="text-danger">*</span></label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter your Password"
                          value={this.state.input.password}
                          onChange={this.handleChange}
                        />
                        <div className="text-danger">{this.state.errors.password}</div>
                      </div>
                      <div className="col-sm-6">
                        <label>Confirm Password <span className="text-danger">*</span></label>
                        <input
                          type="password"
                          className="form-control"
                          name="cpassword"
                          placeholder="Enter your Confirm Password"
                          value={this.state.input.cpassword}
                          onChange={this.handleChange}
                        />
                        <div className="text-danger">{this.state.errors.cpassword}</div>
                      </div>
                    </div>

                    <hr />

                    <div className="row">
                      <div className="col-lg-8">
                        <p className='signin'>Already a user?<Link to="/sign-in">Sign In</Link></p>
                      </div>
                      <div className="col-lg-4 text-right">
                      <button type="submit" className="btn btn-primary">Sign up</button>
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
export default Signup;
