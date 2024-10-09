const express = require("express");
const bcrypt = require("bcrypt");
const odtyperoute = express.Router();
const hodconnection = require("../../mysql/databases/hoddatabase/connections/hostconnection");
odtyperoute.post("/odtype",(req,res)=>{
    const{id}=req.body;
    let query='';
    if(method==="acceptedodhod"){
      const query="select odtype from "
    }
})