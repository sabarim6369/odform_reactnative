const express = require("express");
const acceptedod = express.Router();
const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
acceptedod.post("/acceptedodadvisor",(req,res)=>{
    const{classs,section,year}=req.body;
    const query=`select * from acceptedod where classs=? and section=? and presentyear=?`;
    teacherconnection.query(query,[classs,section,year],(err,result)=>{
        if(err){
            res.status(404).json({message:"some error occurred"});
        }
        const user=result;
        res.status(200).json({user:user});
    })
})
module.exports=acceptedod