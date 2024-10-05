const express = require("express");
const bcrypt = require("bcrypt");
const registeredodroute = express.Router();
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");

registeredodroute.post("/registeredodadvisor", (req, res) => {
    const { classs, section, year } = req.body;
    console.log(">>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<", classs, section, year);

    const query = `select * from studentoddetails where classs=? and section=? and presentyear=?`;
    studentconnection.query(query, [classs, section, year], (err, result) => {
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
});

module.exports = registeredodroute;
