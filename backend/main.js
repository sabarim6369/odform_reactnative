const express=require("express");
const app=express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const studentdatabase=require("./mysql/databases/studentdatabase/main");
const techerdatbase=require("./mysql/databases/teacherdatabase/main");
const hodconnection=require("./mysql/databases/hoddatabase/main");
const coeconnection=require("./mysql/databases/coedatabase/main")
const routes=require("./maincontroller")
app.use("/",routes);
app.listen(process.env.PORT,()=>{
    console.log(`port started at ${process.env.PORT}`);
})