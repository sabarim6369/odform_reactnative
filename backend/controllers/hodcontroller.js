const express=require("express");
const hodcontroller=express.Router();
const signuprouter=require("../routes/hodroutes/signuproute");
const loginrouter=require("../routes/hodroutes/loginroute");
const registeredrouter=require("../routes/hodroutes/registeredod");
hodcontroller.use("/",signuprouter);
hodcontroller.use("/",loginrouter)
hodcontroller.use("/",registeredrouter)
module.exports=hodcontroller;
