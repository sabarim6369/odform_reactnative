const express=require("express");
const teachercontroller=express.Router();
const signuproute=require("../routes/teacherroutes/signuproute")
const loginroute=require("../routes/teacherroutes/loginroute");
const registeredod=require("../routes/teacherroutes/registeredod");
const advisoraccept=require("../routes/teacherroutes/advisoraccept");
const advisorreject=require("../routes/teacherroutes/advisorreject")
const viewdetails=require("../routes/teacherroutes/viewdetails/viewdetails");
const studenlist=require("../routes/teacherroutes/studentlist");
const acceptedodhistory=require("../routes/teacherroutes/history/accepted");
const rejectedodhistory=require("../routes/teacherroutes/history/rejected");
const editodlimit=require("../routes/teacherroutes/editodlimit")
const updateodlimit=require("../routes/teacherroutes/updateodlimit")
teachercontroller.use("/",signuproute);
teachercontroller.use("/",loginroute);
teachercontroller.use("/",registeredod);
teachercontroller.use("/",advisoraccept);
teachercontroller.use("/",advisorreject);
teachercontroller.use("/",viewdetails);
teachercontroller.use("/",acceptedodhistory);
teachercontroller.use("/",rejectedodhistory);
teachercontroller.use("/",studenlist);
teachercontroller.use("/",editodlimit);
teachercontroller.use("/",updateodlimit);
module.exports=teachercontroller;