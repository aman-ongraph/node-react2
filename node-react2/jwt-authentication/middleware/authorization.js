import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();
app.use(cookieParser());
function authenticateToken(req, res, next){
    //const token = localStorage.getItem
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]; 
    console.log(token);
    if (token==null) return res.status(401).json({error : 'null token'});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user)=>{
        //403 access to the requested resource is forbidden
        if(error) res.status(403).json({error : 'error verifying token'});
        //inserting payload in user property of request
        req.user = user;
        next(); 
    })
}
export default authenticateToken;