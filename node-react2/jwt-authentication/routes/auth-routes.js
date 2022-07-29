import express, { json, query } from 'express';
import pool from '../public/src/db/conn.js';  
import bcrypt from 'bcrypt';
var app = express();
import jwtTokens from '../utils/jwt-helpers.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
import pkg from '@prisma/client';
const {PrismaClient} = pkg; 
//middleware for checking user existance form db
var db_check =(req, res, next)=>{
    var duplicatecheck = `select count(email) from users where email='${req.body.email}'`;
    pool.query(duplicatecheck, (q_err, q_res)=>{
        if(q_err){
            console.log(`Error while checking duplicacy: ${q_err}`);
            res.status(200).json({
                success : false,
                data : "error occured"
            });
        }
        if(q_res){ 
            if(q_res.rows['0'].count>0){
                next();
                
            }else{
                
                console.log(`Invalid Credential`);
                //STATUS CODE 401-unauthorized 
                res.status(401).json({
                    success : false,
                    error : "Invalid Credential/User does not exist"
                }); 
            }
        }  
        

    }) 
}

//middleware for checking athenticating user password from db  
var pass_check =(req, res, next)=>{  
    var getpass = `select * from users where email='${req.body.email}'`;
    pool.query(getpass, (q_err, q_res)=>{
        if(q_err){
            console.log(`Error while executing query: ${q_err}`);
            res.status(200).json({
                success : false,
                data : "Error while executing query"
            });
        }
        if(q_res){
            // compare new password with hashed password
            bcrypt.compare(req.body.password, q_res.rows[0].password, function(err, result) {
                if(err){
                    console.log(`decryption error :`,err);
                }
                if(result==true){
                    next(); 
                }else{
                    //STATUS CODE 401-unauthorized 
                res.status(401).json({
                    success : false,
                    error : "Incorrect password"
                }); 
                }
            });
        } 
        

    })
}
router.post('/login', [db_check, pass_check],async (req, res)=>{
    try {
        //jwt token 
        var getuser = `select * from users where email='${req.body.email}'`;
        const user = await  pool.query(getuser);
        let token = jwtTokens(user.rows[0]);
        var resu =  res.cookie('refresh_token', token.refreshToken, { httpOnly : true});
     // console.log(token.accessToken);
        res.json({success : "true", auth : "true", token : token, result : user.rows[0].email});
        //we will get our token here after successful authenticating

    } catch (error) {    
        console.log(error)
        res.status(401).json({
            error : error
        }); 
    }
})

//api for refresh token
router.post('/refresh_token', (req, res)=>{ 
    try {     
        //const refreshToken = req.cookies.refresh_token;
        const refreshToken = req.body.refresh_token;
        console.log(refreshToken); 
        if(refreshToken === null) return res.status(401).json({error : "null refresh token"})
        //verifying refresh token against our secret keys, if it is generated from the same refresh token or not
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user)=>{
            if(error)  return res.status(401).json({error : error, messaage : "error while verifying"})
            let token = jwtTokens(user);
            res.cookie('refresh_token', token.refreshToken, { secure: true , httpOnly : true});
            console.log(`refreshed token   `+ token.refreshToken)
            res.json(token);    
        })   
  
    } catch (error) { 
        console.log(error)
        res.status(401).json({
            error : "caught error"
        });  
    }
})

//delete token on logut

router.delete('/logout',(req, res)=>{
    res.json({state : 'logout'});
})



export default router;    
