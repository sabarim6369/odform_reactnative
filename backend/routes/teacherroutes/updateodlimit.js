const express=require("express");
const updateodlimit=express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
updateodlimit.post("/updateodlimit",(req,res)=>{
    const{a,type,email}=req.body;
    console.log(a,type,email);
    const query = `UPDATE oddays SET ?? = ? WHERE BINARY email = ?`;
studentconnection.query(query,[type,a,email],(err,result)=>{
    if(err){
        console.log("errro occured")
    }
    res.status(200).json({message:"ODlimit updated successfully"});
})
})
module.exports=updateodlimit