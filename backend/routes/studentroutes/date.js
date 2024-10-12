const express=require("express");
const daterouter = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection = require("../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");
daterouter.post("/date",(req,res)=>{
    const{id,type}=req.body;
    console.log(type,id)
    let query='';
  let connection=studentconnection;
  if(type==="internal"){
    query=`select startdate,enddate from acceptedodhod where id=?`;
    connection=hodconnection;
  }
  else if(type==="external"){
    query=`select startdate,enddate from acceptedodcoe where id=?`;
    connection=coeconnection
  }
  connection.query(query,[id],(error,result)=>{
    if(error){
        console.log("error occured");
    }
    console.log(result[0].startdate)
    res.status(200).json({startdate:result[0].startdate,enddate:result[0].enddate})
  })
})
module.exports=daterouter;