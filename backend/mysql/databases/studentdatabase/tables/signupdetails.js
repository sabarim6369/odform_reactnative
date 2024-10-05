    const studentconnection=require("../connections/hostconnection");
const mysql=require("mysql");
const query = `CREATE TABLE IF NOT EXISTS signupdetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    section varchar(100),
    classhandling varchar(100),
    year int,
    rollno varchar(100)
);`;
const signuptable=studentconnection.query(query,(err,result)=>{
    if(err){
        console.log("error occurred",err);
    }
    else{
        console.log("table created successfully");
    }
})
module.exports=signuptable;