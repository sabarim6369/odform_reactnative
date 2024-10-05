const express=require("express");
const mainrouter=express.Router();
const studentroutes=require("./controllers/studentcontroller");
const teacherroutes=require("./controllers/teachercontroller")
const hodroutes=require("./controllers/hodcontroller")

mainrouter.use("/",studentroutes);
mainrouter.use("/",teacherroutes);
mainrouter.use("/",hodroutes);
module.exports=mainrouter;