const express=require("express");
const studentcontroller=express.Router();
const loginrouter=require("../routes/studentroutes/loginroute")
const signuprouter=require("../routes/studentroutes/signuproute")
const odinputrouter=require("../routes/studentroutes/odapplyinput")
const odformrouter=require("../routes/studentroutes/odformroute")
const odformrouter1=require("../routes/studentroutes/odformreturnroute");
const previousodrouter=require("../routes/studentroutes/previousods");
const odinprogress=require("../routes/studentroutes/odinprogress")
studentcontroller.use("/",loginrouter);
studentcontroller.use("/",signuprouter);
studentcontroller.use("/",odinputrouter)
studentcontroller.use("/",odformrouter)
studentcontroller.use("/",odformrouter1);
studentcontroller.use("/",previousodrouter);
studentcontroller.use("/",odinprogress);
module.exports=studentcontroller;