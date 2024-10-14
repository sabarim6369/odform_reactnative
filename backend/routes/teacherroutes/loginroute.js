const express = require("express");
const bcrypt = require("bcrypt");
const loginroute = express.Router();
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");

loginroute.post("/teacherlogin", (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
    }

    const query = "SELECT * FROM signupdetails WHERE BINARY email = ?";
    teacherconnection.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found. Please check the email." });
        }

        const user = results[0];
        
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid password." });
            }

           console.log("🎂🎂🎂🎂",user.username)
            return res.status(200).json({ message: "Login successful!",user});
        });
    });
});

module.exports = loginroute;
