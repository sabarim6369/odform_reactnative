const express = require("express");
const bcrypt = require("bcrypt");
const registeredodroute = express.Router();
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const hodconnection=require("../../mysql/databases/hoddatabase/connections/hostconnection")

registeredodroute.post("/registeredodhod", (req, res) => {
    const { year,department} = req.body;
    console.log(">>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<", year,department);
  if(year===1){
    const query = `select * from acceptedod where presentyear=?`;
    teacherconnection.query(query, [year], (err, result) => {
        if (err) {
            console.log("error",err)
            return res.status(400).json({ message: "internal server error" });
        }
        if (result.length < 1) {
            console.log("no od right now")
            return res.status(200).json({ message: "no od right now" });
        }
        const user = result;
        console.log(user);
        return res.status(200).json({user:user});
    });


  }
  else{
    const query = `select * from acceptedod where presentyear>1 and classs=?`;
    teacherconnection.query(query, [year,department], (err, result) => {
        if (err) {
            console.log("error",err)
            return res.status(400).json({ message: "internal server error" });
        }
        if (result.length < 1) {
            console.log("no od right now")
            return res.status(200).json({ message: "no od right now" });
        }
        const user = result;
        console.log(user);
        return res.status(200).json({user:user});
    });
  }
   
});

module.exports = registeredodroute;
