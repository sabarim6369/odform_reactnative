const express=require("express")
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection")
const readcontroller=express.Router()
readcontroller.post("/read",(req,res)=>{
    const{email}=req.body;
    const query="update studentmessages set isread=true where BINARY email=?  and isread = false";
    studentconnection.query(query,[email],(err,result)=>{
        if(err){
            console.log("error occurred",err)
        }
    })
})
module.exports=readcontroller;