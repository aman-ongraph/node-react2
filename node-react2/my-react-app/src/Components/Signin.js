import React, { useState} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Signin = () =>{
  const [user, setUser] = useState({});
  const [logStatus, setlogStatus] = useState('');
/*  //We can use useState instead of refrence
  let email = React.createRef();  // React use ref to get input value
  let password = React.createRef();  // React use ref to get input value
   */
  const handleChange = (e) =>{
    setUser({...user, [e.target.name] : e.target.value})
    //console.log(user)
  }
  //Login API handler
 const handleSubmit = (event)=> {
    event.preventDefault();
    /* console.log(email.current.value);
    console.log(password.current.value); */
     // console.log(fetch("http://localhost:4000/api/auth/login"));

     //Call API which generates authentication token
        try {
          console.log('her1')
        let res =  fetch("http://localhost:4000/api/auth/login", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify( {email : user.email, password : user.password }   /* {
            email: email.current.value, 
            password: password.current.value,
          } */),
        })
        .then(res => res.json())
          .then(newres => {
             if(newres.success==='true'){
              setlogStatus('Welcome !!')
              setTimeout(()=>{setlogStatus('')  }, 3000);
                //Storing access toke and refresh token in Browser's cookies
                Cookies.set('access', newres.token.accessToken);
                Cookies.set('refresh', newres.token.refreshToken);
            }
              
              //Storing Token to browser's local storage
              //localStorage.setItem('access_token', newres.token.accessToken )
              //Storing refresh token in browser's local storage
             // localStorage.setItem('refresh_token', newres.token.refreshToken )
              
             // isLoggedIn(true);
            //  console.log(loggedIn)
          })
      } catch (error) {
        console.log(`error occured : `, error)
      } 
 
     /* 
      console.log(newres.token.accessToken)
     let input = {};
      input["email"] = "";
      input["password"] = "";
      this.setState({ input: input }); */
    
  } 

  
    return (

      <div className="container">
        
        <div className="row">
          <article className="col-xs-12 maincontent">
            <header className="page-header">
              
              <div className="col-lg-4 text-right">
              </div>
              <h1 className="page-title">Sign in</h1>
              
            </header>

            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h3 className="thin text-center">Sign in to your account</h3>
                  <p className="text-center text-muted">No Account? <Link to="/sign-up">Register</Link></p>
                  <hr />
                  <h3 className='successmsg text-center'>{logStatus}</h3>
                  <form action="/home" onChange={handleChange} onSubmit={handleSubmit} >
                    <div className="top-margin">
                      <label>Email<span className="text-danger">*</span></label>
                      <input
                      //Since we are using useState hook instead of refrence method
                      //ref={email}
                        type="text"
                        name="email"
                        className="form-control"
                      />
                      <div className="text-danger"></div>
                    </div>
                    <div className="top-margin">
                      <label>Password <span className="text-danger">*</span></label>
                      <input
                      //Since we are using useState hook instead of refrence method
                      //ref={password} 
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <div className="text-danger"></div>
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
export default Signin;
