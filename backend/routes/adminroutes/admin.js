const express = require("express");
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection = require("../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");
const admin = express.Router();

admin.post("/admin", (req, res) => {
    const { email, userType } = req.body;
    console.log(email, userType);
    
    let query = '';
    let connection = studentconnection; // Default connection

    if (userType === "Student") {
        query = "DELETE FROM signupdetails WHERE email=?";
        connection = studentconnection;
    } else if (userType === "Teacher") {
        query = "DELETE FROM signupdetails WHERE email=?";
        connection = teacherconnection;
    } else if (userType === "HOD") {
        query = "DELETE FROM signupdetails WHERE email=?";
        connection = hodconnection;
    } else if (userType === "COE") {
        query = "DELETE FROM signupdetails WHERE email=?";
        connection = coeconnection;
    } else {
        return res.status(400).json({ message: "Invalid user type" });
    }

    connection.query(query, [email], (err, result) => {
        if (err) {
            console.error("Error occurred:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            console.log("No email found");
            return res.status(404).json({ message: "Email does not exist" });
        } else {
            console.log("Successfully removed email");
            return res.status(200).json({ message: "Successfully removed the email" });
        }
    });
});

module.exports = admin;
