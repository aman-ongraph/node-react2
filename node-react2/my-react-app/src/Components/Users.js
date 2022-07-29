import { Link } from 'react-router-dom';
import { useState } from 'react';
import Cookies from 'js-cookie';
const Users = ({style}) => {
  const [err, seterr] = useState("")
  const requestUsers = async(accessToken, refreshToken) =>{
    console.log('request login')
  //  return new Promise((resolve, reject)=>{
      
        const res = await fetch("http://localhost:4000/api/users", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer `+  accessToken/* localStorage.getItem('access_token') */
          },
        })
        const data =await res.json();
        if(data.status==='false'){
          //Null token Pleae login again
          if(data.error =='null token'){
            console.log("null token")
          }
          //Error verifying Token //Expired token
          //We would refresh the token here 
          else if(data.error=='error verifying token'){
            seterr('Error verifying token')
            console.log("error verifying token")
            //Here we get our new access token
             const newaccessToken = await refresh(accessToken, refreshToken)
             //We would now call requestUsers function recursively because we want to access this route
             return await requestUsers(newaccessToken, refreshToken)
          }
          //  resolve(false)
        }else{
          console.log('Route accessed successfully')
          //Route accessed successfully
        //  resolve(true)
        }
        
  
          
      
  //  })
  }
    //Refresh tokrn
    const refresh = async(refreshToken) =>{
      console.log('refresh called')
      
        let res = await fetch("http://localhost:4000/api/auth/refresh_token", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            'refresh_token' : refreshToken
          })
        })

        const data = await res.json();
        console.log(data)
        if(data.refreshToken){
              console.log('cookies set ')
              Cookies.set('access', data.accessToken)
              //Return new access token 
              return data.accessToken
            }
            if(data.error.name==="JsonWebTokenError"){
              seterr('Web token expired')
              console.log('JsonWebTokenError')
              
             //return null;
            }
            
        // Here we updated the 
    
      
    }
    //Check access and return token
    const hasAccess = async (accessToken, refreshToken) =>{
      console.log('has access called')
      if(!refreshToken) return null
      if(accessToken){
        //Our access token has expired here so we need new access token
        //We will generate new access Token by using our refresh token
        accessToken = await refresh(refreshToken);
        return accessToken;
      }
      return accessToken;
    }

   //GET API handler for user access
  
   const handleSubmitUsers = async (event) =>{
    let accessToken = Cookies.get('access');
    let refreshToken = Cookies.get('refresh');

     accessToken = await hasAccess(accessToken, refreshToken)
     
     if(!accessToken){
        //Error saying login again
        console.log('login again please')
        seterr('Please login again')
     }else{
        await requestUsers(accessToken, refreshToken)
     }
    /*  try {
      let res =  fetch("http://localhost:4000/api/users", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer `+ localStorage.getItem('access_token')
        },
      })
      .then(res => res.json())
        .then(data => {
            
        } )// Here we updated the 

        console.log(res)
    } catch (error) { 
      console.log(`error occured : `, error)
    } */ 
  }

  return <div>
            <a  href="#" onClick={handleSubmitUsers} style={style} >Users</a>  
        </div>;
};

export default Users;
