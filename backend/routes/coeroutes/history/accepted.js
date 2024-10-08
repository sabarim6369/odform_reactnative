const express = require("express");
const acceptedodcoe = express.Router();
const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection=require("../../../mysql/databases/hoddatabase/connections/hostconnection")
const coeconnection = require("../../../mysql/databases/coedatabase/connections/hostconnection");
acceptedodcoe.post("/acceptedodcoe",(req,res)=>{
        const query=`select * from acceptedodcoe`;
    coeconnection.query(query,(err,result)=>{
        if(err){
            res.status(404).json({message:"some error occurred"});
        }
        const user=result;
        res.status(200).json({user:user});
    })
    
})
module.exports=acceptedodcoe