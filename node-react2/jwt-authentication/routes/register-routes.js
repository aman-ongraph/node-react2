import express, { json, query } from 'express';
import pool from '../public/src/db/conn.js';  
import bcrypt from 'bcrypt';
var app = express();
import { body, validationResult } from 'express-validator';  
import bodyParser from 'body-parser';
const router = express.Router(); 
//Adding encoded for using bodyParser
//Body parser is required here to normalise email and to use body parser inbuilt functions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
import pkg from '@prisma/client';
const {PrismaClient} = pkg; 
const prisma = new PrismaClient();
var db_validation =(req, res, next)=>{
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
                console.log(`User already exists`);
                res.status(200).json({
                    success : false,
                    data : "User already exists"
                });
                
            }else{
                next();
            }
        }
        

    })
}
router.post('/' ,/*db_validation,*/ body('email').isEmail().normalizeEmail(),
body('password').isLength({
        min: 6
    }), async(req, res)=>{ 
    try{
       
        //Validate email address
       
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("error here") ;
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                message : "Password too small"
            });
        }
        else{
              //get html body inputs using req.body.name
                var password = req.body.password;
                var cpassword = req.body.cpassword;
                //move controller only if password match
                if(password==cpassword){
                    var data = {
                            firstname : req.body.firstname,
                            lastname : req.body.lastname,
                            email : req.body.email,
                            password : req.body.password
                        }   
                    //Hash password here
                    const hashedpass = bcrypt.hash(req.body.password, 10, async function(err, hash) {
                        const user = await prisma.User.create({
                            data :{
                                name : req.body.firstname,
                                password : hash
                            }
                        })
                        res.json(user)
                       /* var insert_user = `insert into users (firstname, lastname, email, password) VALUES('${data.firstname}', '${data.lastname}','${data.email}','${hash}')`;
                        pool.query(insert_user, (err, resp)=>{
                            if(err){
                                console.log(`insertion error ${err}`);
                            }
                            else if(resp){
                                console.log(`Insertion Successful ${resp}`);
                                res.status(200).json({
                                    success: true,
                                    message: 'Insertion successful',
                                }) 
                            }
                        })
                        */
                    })
                   

                    
                   /*  res.status(200).json({
                        success: true,
                        message: 'Login successful',
                    })  */
                    //Commenting mongo db insertion since we are using postgres
                /*  // Create an instance of model Registeruser
                    var newuser = new Registeruser(data) ;
                    // save newuser to database
                    newuser.save(function (err, book) {
                        if (err) return console.error(err);
                        res.render('index')
                    }); */
                }else{
                    res.status(404).json({
                        success: false,
                        message: 'Password and Connfirm Password should match',
                    }) 
                } 
        }

    }catch(error){
        console.log(error)
        res.status(404).send(error)
    }
    
})

export default router;