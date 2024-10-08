    const express = require("express");
    const acceptedodhod = express.Router();
    const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
    const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
    const hodconnection=require("../../../mysql/databases/hoddatabase/connections/hostconnection")
    acceptedodhod.post("/acceptedodhod",(req,res)=>{
        const{year,department}=req.body;
        if(year===1){
            const query=`select * from acceptedodhodinternal where presentyear=?`;
        hodconnection.query(query,[year],(err,result)=>{
            if(err){
                res.status(404).json({message:"some error occurred"});
            }
            const query1=`select * from acceptedodhodexternal where presentyear=?`;
            hodconnection.query(query1,[year],(error,results)=>{
                if(error){
                    res.status(400).json({message:"some error occurred"});
                }


            const user=[...result,...results];
            res.status(200).json({user:user});
        })
    })
        }
        else{
            const query=`select * from acceptedodhodinternal where classs=? and presentyear>1`;
            hodconnection.query(query,[department],(err,result)=>{
                if(err){
                    res.status(404).json({message:"some error occurred"});
                }
                const query1=`select * from acceptedodhodexternal where classs=? and presentyear>1`;
                hodconnection.query(query1,[department],(error,results)=>{
                    if(error){
                        res.status(400).json({message:"some error occurred"});
                    }
                    
                const user=[...result,...results]
                res.status(200).json({user:user});
            })
        })
        }
    
    })
    module.exports=acceptedodhod