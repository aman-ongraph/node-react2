const express = require('express');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
//Commenting since we are using ejs
//const hbs = require('hbs')
require('./db/conn');
//Commenting since we are using postgres database
//const Registeruser  = require('./models/register.js')
const {pool, schemaName}  = require('./models/registerpg.js')
const port = process.env.PORT || 3000;
//express.urlencoded is a middleware function which parses incomming request
app.use(express.urlencoded({extended:false}));

//Adding encoded for using bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// commenting this will output same result / still using it
// express.json() is a built in express middleware that convert request body to JSON. 
app.use(express.json())
//since nothing in static_path so controller will move forward
const static_path = path.join(__dirname,"../public" );

const tpl_path = path.join(__dirname,"../templates/views/" );
//Commenting partial path since using ejs template engine
//const partial_path = path.join(__dirname,"../templates/partials/" );
//Here express.static is used for running static file i.e index.js file in public folder
//since public folder is empty contoller will move on to next line
app.use(express.static(static_path))

//Here we will run views or templates by default(set default engine) i.e index.hbs file in views pr template folder
//Commenting hbs partials since now we are using ejs template engine
/* app.set("view engine", "hbs") */
//Setting template engine to ejs
app.set("view engine", "ejs")
//Now we change path for views to template, so that engine could run on our specified path
app.set('views', tpl_path )
//Commenting hbs partials since now we are using ejs template engine
//hbs.registerPartials(partial_path)
app.get('/', (req, res)=>{
    //res.send('here am i ')
    //here we render our views here we run index file through view engine
    res.render("index")
})
//Route to about page
app.get('/about', (req, res)=>{
    res.render("about")
})
//Route to contact page
app.get('/contact', (req, res)=>{
    res.render("contact")
})
//Route to signin page
app.get('/sign-in', (req, res)=>{
    res.render("signin")
})
//Route to signup page
app.get('/sign-up', (req, res)=>{
    res.render("signup")
})
//Route to left-sidebar page
app.get('/sidebar-left', (req, res)=>{
    res.render("sidebar-left")
})
//Route to right-sidebar page
app.get('/sidebar-right', (req, res)=>{
    res.render("sidebar-right")
})
//Route to livedemo page
app.get('/livedemo', (req, res)=>{
    res.render("livedemo")
})

var db_check =(req, res, next)=>{
    var duplicatecheck = `select count(email) from ${schemaName}.logger where email='${req.body.email}'`;
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
//Enter form values in database
app.post('/register',db_check, body('email').isEmail().normalizeEmail(),
body('password').isLength({
        min: 6
    }), async(req, res)=>{
    try{
       console.log(req.body.password) ;
        //Validate email address
       
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
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
                            password : req.body.password,
                            cpassword : req.body.cpassword
                        } 

                    var insert_user = `insert into ${schemaName}.logger (firstname, lastname, email, password) VALUES('${data.firstname}', '${data.lastname}','${data.email}','${data.password}')`;
                    pool.query(insert_user, (err, resp)=>{
                        if(err){
                            console.log(`insertion error ${err}`);
                        }
                        else if(resp){
                            console.log(`Insertion Successful ${resp}`);
                            res.render('index')
                        }
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
                    res.status(404).render('signup');
                } 
        }

    }catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})
app.listen(port,()=>{
    console.log(  `server running on port  ${port}`);
});