const mysql=require("mysql");
require("dotenv").config();
const studentconnection = mysql.createPool({
    host: process.env.DB2_HOST,
    user: process.env.DB2_USER,
    password: process.env.DB2_PASSWORD,
    database: process.env.DB2_DATABASE,
  });

module.exports=studentconnection;