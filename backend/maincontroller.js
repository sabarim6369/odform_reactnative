const express=require("express");
const mainrouter=express.Router();
const studentcontroller=require("./controllers/studentcontroller");
const teachercontroller=require("./controllers/teachercontroller")
const hodcontroller=require("./controllers/hodcontroller");
const coecontroller = require("./controllers/coecontroller");

mainrouter.use("/",studentcontroller);
mainrouter.use("/",teachercontroller);
mainrouter.use("/",hodcontroller);
mainrouter.use("/",coecontroller);
module.exports=mainrouter;