import pg from 'pg';
const {Pool} = pg;

let localCredential = { 
    user: "postgres",
    host: "localhost",
    database: "jwt",
    password: "admin",
    port: 5432,
  };
  
//const poolString = localCredential;
const pool = new Pool(localCredential);
//const poolString = localCredential;

export default pool;
 