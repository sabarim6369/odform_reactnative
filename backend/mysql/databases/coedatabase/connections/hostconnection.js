const mysql=require("mysql");
require("dotenv").config();
const coeconnection = mysql.createPool({
    host: process.env.DB4_HOST,
    user: process.env.DB4_USER,
    password: process.env.DB4_PASSWORD,
    database: process.env.DB4_DATABASE,
  });

module.exports=coeconnection;