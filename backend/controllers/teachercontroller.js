const express=require("express");
const teachercontroller=express.Router();
const signuproute=require("../routes/teacherroutes/signuproute")
const loginroute=require("../routes/teacherroutes/loginroute");
const registeredod=require("../routes/teacherroutes/registeredod");
const advisoraccept=require("../routes/teacherroutes/advisoraccept");
const advisorreject=require("../routes/teacherroutes/advisorreject")
const viewdetails=require("../routes/teacherroutes/viewdetails");
const acceptedodhistory=require("../routes/teacherroutes/history/accepted");
const rejectedodhistory=require("../routes/teacherroutes/history/rejected");
teachercontroller.use("/",signuproute);
teachercontroller.use("/",loginroute);
teachercontroller.use("/",registeredod);
teachercontroller.use("/",advisoraccept);
teachercontroller.use("/",advisorreject);
teachercontroller.use("/",viewdetails);
teachercontroller.use("/",acceptedodhistory);
teachercontroller.use("/",rejectedodhistory);
module.exports=teachercontroller;