const express=require("express");
const hodcontroller=express.Router();
const signuprouter=require("../routes/hodroutes/signuproute");
const loginrouter=require("../routes/hodroutes/loginroute");
const registeredrouter=require("../routes/hodroutes/registeredod");
const accepthod=require("../routes/hodroutes/hodaccept")
const hodreject=require("../routes/hodroutes/hodreject")
const acceptedodhod=require("../routes/hodroutes/history/acceptedod")
const rejectedodhod=require("../routes/hodroutes/history/rejectedod")
hodcontroller.use("/",signuprouter);
hodcontroller.use("/",loginrouter)
hodcontroller.use("/",registeredrouter)
hodcontroller.use("/",accepthod);
hodcontroller.use("/",hodreject);
hodcontroller.use("/",acceptedodhod);
hodcontroller.use("/",rejectedodhod);
module.exports=hodcontroller;
