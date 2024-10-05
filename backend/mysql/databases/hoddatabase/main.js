// const mysql=require("mysql");
// require("dotenv").config();
// const hodconnection = mysql.createPool({
//     host: process.env.DB3_HOST,
//     user: process.env.DB3_USER,
//     password: process.env.DB3_PASSWORD,
//     database: process.env.DB3_DATABASE,
//   });
//  hodconnection.getConnection((err) => {
//     if (err) {
//       console.error("Error occurred in connection1:", err.message);
//     } else {
//       console.log("SQL connection success in hod database");
//     }
//   });
// module.exports=hodconnection;
const hoddatabase=require("./connections/tableconnection")
module.exports=hoddatabase;
