const express=require("express");
const mainrouter=express.Router();
const studentcontroller=require("./controllers/studentcontroller");
const teachercontroller=require("./controllers/teachercontroller")
const hodcontroller=require("./controllers/hodcontroller");
const coecontroller = require("./controllers/coecontroller");
const admincontroller=require("./controllers/admincontroller");
mainrouter.use("/",studentcontroller);
mainrouter.use("/",teachercontroller);
mainrouter.use("/",hodcontroller);
mainrouter.use("/",coecontroller);
mainrouter.use("/",admincontroller);
module.exports=mainrouter;