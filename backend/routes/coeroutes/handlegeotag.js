// { imageUrl: uploadedImageUrl,id:id});
const express = require("express");
const handlegeotag = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");
const hodconnection=require("../../mysql/databases/hoddatabase/connections/hostconnection");
handlegeotag.post("/saveImageUrl",(req,res)=>{
    const{imageUrl,id,email}=req.body;
    const uploadDate = new Date()
    const query='insert into geotagexternal(odid,photo_url,email,upload_date) values(?,?,?,?)';
    coeconnection.query(query,[id,imageUrl,email,uploadDate],(error,result)=>{
       if(error){
        console.log("error occured");
       }
       res.status(200).json({message:"photo uploaded successfully"});
    })
  
})
module.exports=handlegeotag