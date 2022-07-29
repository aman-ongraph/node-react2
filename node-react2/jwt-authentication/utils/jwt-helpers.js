import jwt from 'jsonwebtoken';
//it takes payload 
function jwtTokens({firstname, lastname, email}){
    //user payload
    const user = {
            firstname,
            lastname, 
            email
    };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '10s'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn : '14400m'});// In general it should be around 40 days
    return({accessToken, refreshToken});
}

export default jwtTokens;