const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    cpassword : {
        type : String,
        required : true,
    }
})

//Create a collection in this database schema
//here logger is the name of collection
var Registeruser = mongoose.model('Registeruser',userSchema, 'logger')
module.exports = Registeruser; 