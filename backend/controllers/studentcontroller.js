const express=require("express");
const studentcontroller=express.Router();
const loginrouter=require("../routes/studentroutes/loginroute")
const signuprouter=require("../routes/studentroutes/signuproute")
const odinputrouter=require("../routes/studentroutes/odapplyinput")
const odformrouter=require("../routes/studentroutes/odformroute")
const odformrouter1=require("../routes/studentroutes/odformreturnroute");
studentcontroller.use("/",loginrouter);
studentcontroller.use("/",signuprouter);
studentcontroller.use("/",odinputrouter)
studentcontroller.use("/",odformrouter)
studentcontroller.use("/",odformrouter1);
module.exports=studentcontroller;