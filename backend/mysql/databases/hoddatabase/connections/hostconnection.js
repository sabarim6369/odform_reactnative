const mysql=require("mysql");
require("dotenv").config();
const hodconnection = mysql.createPool({
    host: process.env.DB3_HOST,
    user: process.env.DB3_USER,
    password: process.env.DB3_PASSWORD,
    database: process.env.DB3_DATABASE,
  });

module.exports=hodconnection;