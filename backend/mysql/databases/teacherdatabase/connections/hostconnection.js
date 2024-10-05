const mysql=require("mysql");
require("dotenv").config();
const teacherconnection = mysql.createPool({
    host: process.env.DB1_HOST,
    user: process.env.DB1_USER,
    password: process.env.DB1_PASSWORD,
    database: process.env.DB1_DATABASE,
  });

module.exports=teacherconnection;