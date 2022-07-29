import express, { query } from 'express';
import pool from '../public/src/db/conn.js';  
import authenticateToken from '../middleware/authorization.js';
import bcrypt from 'bcrypt';
const router = express.Router();  
import pkg from '@prisma/client';
const {PrismaClient} = pkg; 
const prisma = new PrismaClient();
//Get data form database and send in json format
router.get('/', authenticateToken, async (req, res)=>{       
    try {  
         const users = await pool.query('select email from users;'); 
         res.json({users : users.rows, message : "User authentication successfull"});
    } catch (error) {
        console.log(`catch error :`,error); 
        res.status(500).json({error : error });     
    }
})   
 
router.post('/', async (req, res)=>{ 
    try {
        console.log(req.body)
        const hashedpass = bcrypt.hash(req.body.password, 10,async  function(err, hash) {
            //Returning keyword means that once operation in done we will get that record back
            const user = await prisma.User.create({
                data :{
                    name : req.body.firstname,
                    password : hash
                }
            })
            res.json(user)
           /* var insert_query = `insert into users (firstname, lastname, email, password) VALUES('${req.body.firstname}', '${req.body.lastname}','${req.body.email}','${hash}');`;
            const insertUser =  pool.query(insert_query, (err, resp)=>{
                if(err){
                    console.log(`insertion error ${err}`); 
                }
                else if(resp){
                    res.json({insertedUser : true}) 
                    console.log(`Insertion Successful ${resp}`);
                }
            })
            */
        });
          
    } catch (error) {
        res.status(500).json({error : error });
    }
})


export default router;   