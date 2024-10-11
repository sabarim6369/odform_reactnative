const express=require("express");
const studentlist=express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
studentlist.post("/studentlist",(req,res)=>{
    const{classs,section,year}=req.body;
    const query="select * from signupdetails where classhandling=? and section=? and year=? order by rollno";
    studentconnection.query(query,[classs,section,year],(err,result)=>{
        if(err){
            console.log("error occurred",err);  
            return res.status(500).json({ message: "Error fetching student details" });
        }
        console.log(result);
        return res.status(200).json({result:result});
    })
})
module.exports=studentlist