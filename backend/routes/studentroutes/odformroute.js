const express = require("express");
const odformrouter=express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
odformrouter.post("/odform",(req,res)=>{
  const{email,rollno,name,classhandling,section,year,odType,reason,appliedDate1,formattedStartDate,formattedEndDate,totalDays,photo,pdf,internallimits,externallimits}=req.body;
  
  console.log(email,rollno,name,classhandling,section,year,odType,reason,appliedDate1,formattedStartDate,formattedEndDate,totalDays,photo,pdf)
  const query=`insert into studentoddetails(email,rollno,username,classs,section,reason,applieddate,startdate,enddate,total_days,pdf,photo,presentyear,odtype,appliedtime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,now())`;
studentconnection.query(query,[email,rollno,name,classhandling,section,reason,appliedDate1,formattedStartDate,formattedEndDate,totalDays,pdf,photo,year,odType],(err,results)=>{
  if(err){
    console.log("errror occcured",err);
  }
  const query1=`insert into oddays(odtype,total_days,email,appliedtime,externallimit,internallimit,applieddate,startdate,enddate)values(?,?,?,now(),?,?,?,?,?)`;
  studentconnection.query(query1,[odType,totalDays,email,externallimits,internallimits,appliedDate1,formattedStartDate,formattedEndDate],(err,oddaysresult)=>{
    if(err){
      console.log("error occured",err);
    }
    if(odType=='internal'){
      const internalquery=`insert into internalod(email,rollno,username,classs,section,reason,applieddate,startdate,enddate,total_days,pdf,photo,presentyear,appliedtime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,now())`;
      studentconnection.query(internalquery,[email,rollno,name,classhandling,section,reason,appliedDate1,formattedStartDate,formattedEndDate,totalDays,pdf,photo,year],(err,internalresult)=>{
        if(err){
          console.log("error occured",err);
        }
        res.status(200).json({message:"form submitted successfully"});
      })
    }
    else if(odType=='external'){
      const externalquery=`insert into externalod(email,rollno,username,classs,section,reason,applieddate,startdate,enddate,total_days,pdf,photo,presentyear,appliedtime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,now())`;
      studentconnection.query(externalquery,[email,rollno,name,classhandling,section,reason,appliedDate1,formattedStartDate,formattedEndDate,totalDays,pdf,photo,year],(err,externalresult)=>{
        if(err){
          console.log("error occured",err);
        }
        res.status(200).json({message:"form submitted successfully"});
      })
    }
  });
  
});
})
module.exports=odformrouter;