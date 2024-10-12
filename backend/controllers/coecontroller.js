const express=require("express");
const coecontroller=express.Router();
const signuprouter=require("../routes/coeroutes/signuproute");
const loginrouter=require("../routes/coeroutes/loginroute");
const registeredodroute=require("../routes/coeroutes/registeredod")
const acceptedodcoe=require("../routes/coeroutes/history/accepted")
const rejectedodcoe=require("../routes/coeroutes/history/rejected")
const coeaccept=require("../routes/coeroutes/coeaccept");
const coereject=require("../routes/coeroutes/coereject");
const handlegeotag=require("../routes/coeroutes/handlegeotag")
coecontroller.use("/",signuprouter);
coecontroller.use("/",loginrouter);
coecontroller.use("/",registeredodroute);
coecontroller.use("/",acceptedodcoe);
coecontroller.use("/",rejectedodcoe);
coecontroller.use("/",coeaccept);
coecontroller.use("/",handlegeotag);
module.exports=coecontroller;