const express = require("express");
const rejectedodhod = express.Router();
const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection=require("../../../mysql/databases/hoddatabase/connections/hostconnection")
rejectedodhod.post("/rejectedodhod",(req,res)=>{
    const{year,department}=req.body;
    if(year===1){
        const query=`select * from rejectedodhod where presentyear=?`;
        hodconnection.query(query,[year],(err,result)=>{
            if(err){
                res.status(404).json({message:"some error occurred"});
            }
            const user=result;
            res.status(200).json({user:user});
        })
    }
    else{
        const query=`select * from rejectedodhod where classs=? and presentyear>1`;
        hodconnection.query(query,[department],(err,result)=>{
            if(err){
                res.status(404).json({message:"some error occurred"});
            }
            const user=result;
            res.status(200).json({user:user});
        })
    }    
})
module.exports=rejectedodhod