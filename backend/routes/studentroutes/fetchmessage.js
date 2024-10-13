const express = require("express");
const fetchmessage = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
fetchmessage.post("/fetchMessages",(req,res)=>{
    const{email}=req.body;
    const query="select message,id,created_at from studentmessages where email=?";
    studentconnection.query(query,[email],(error,result)=>{
        if(error){
            console.log("error occured",error);
        }
        console.log(result)
        res.status(200).json({messages:result});
    })
})
module.exports=fetchmessage;