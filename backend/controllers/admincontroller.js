const express=require("express");
const admincontroller=express.Router();
const admin=require("../routes/adminroutes/admin")
admincontroller.use("/",admin)
module.exports=admincontroller