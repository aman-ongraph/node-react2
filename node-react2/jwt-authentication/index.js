import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import usersRouter from './routes/user-routes.js';
import authRouter from './routes/auth-routes.js';
import bcrypt from 'bcrypt';
dotenv.config();

//base path of our project
// C:\Users\aman\jwt-authentication
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Initialize PORT
const PORT = process.env.PORT || 3000;

const corsOptions = {Credential : true, origin : process.env.URL || '*'};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
//We will add static file in this folder public
app.use('/', express.static(join(__dirname,'public')));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.listen(PORT, (err, res)=>{
    if(err){
        console.log('server listen error')
    }
    console.log(`Server listening on port`, PORT);
})  