const express=require("express");
const studentcontroller=express.Router();
const loginrouter=require("../routes/studentroutes/loginroute")
const signuprouter=require("../routes/studentroutes/signuproute")
const odinputrouter=require("../routes/studentroutes/odapplyinput")
const odformrouter=require("../routes/studentroutes/odformroute")
const odformrouter1=require("../routes/studentroutes/odformreturnroute");
const previousodrouter=require("../routes/studentroutes/previousods");
const odinprogress=require("../routes/studentroutes/odinprogress")
const datecontroller=require("../routes/studentroutes/date")
const lastdayupload=require("../routes/studentroutes/lastdayupload")
//cron schedule
const pastods=require("../routes/studentroutes/cron/pastods")
const dailycheck=require("../routes/studentroutes/cron/dailycheckforgeotag")
// const teachermail=require("../routes/studentroutes/cron/teachersmail")
studentcontroller.use("/",loginrouter);
studentcontroller.use("/",signuprouter);
studentcontroller.use("/",odinputrouter);
studentcontroller.use("/",odformrouter);
studentcontroller.use("/",odformrouter1);
studentcontroller.use("/",previousodrouter);
studentcontroller.use("/",odinprogress);
studentcontroller.use("/",datecontroller);
studentcontroller.use("/",lastdayupload);

module.exports=studentcontroller;