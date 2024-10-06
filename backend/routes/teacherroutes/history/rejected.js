const express = require("express");
const rejectedod = express.Router();
const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
rejectedod.post("/rejectedodadvisor",(req,res)=>{
    const{classs,section,year}=req.body;
    const query=`select * from rejectedod where classs=? and section=? and presentyear=?`;
    teacherconnection.query(query,[classs,section,year],(err,result)=>{
        if(err){
            res.status(404).json({message:"some error occurred"});
        }
        const user=result;
        res.status(200).json({user:user});
    })
})
module.exports=rejectedod