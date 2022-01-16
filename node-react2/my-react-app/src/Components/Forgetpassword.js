import React from 'react';
import './App.css';

class Forgetpassword extends React.Component {
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
            console.log(this.state);

            let input = {};
            input["email"] = "";
            this.setState({ input: input });
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
                errors["email"] = "Please enter valid Email Address.";
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
                    <div className='forget_password_container'>
                        <article className="col-xs-12 maincontent">
                            <header className="page-header">
                                <h1 className="page-title">Forget Password</h1>
                            </header>
                        </article>
                        <form action="/sign-in" onSubmit={this.handleSubmit}>
                            <div className="top-margin">
                                <label>Email <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.input.email}
                                    onChange={this.handleChange}
                                />
                                <div className="text-danger">{this.state.errors.email}</div>
                            </div>
                            <div className='submit_button'>
                                <div className="col-lg-4 text-left">
                                    <button className="btn btn-primary" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div>

        );
    }
}
export default Forgetpassword;