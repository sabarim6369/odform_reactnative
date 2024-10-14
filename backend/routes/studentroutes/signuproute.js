const express = require("express");
const signuproute = express.Router();
const bcrypt = require("bcrypt");
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");

signuproute.post("/signup", async (req, res) => {
    const { email, password, username, classHandling, section, rollNo, year } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkEmailQuery = "SELECT * FROM signupdetails WHERE BINARY email = ?";
        
        studentconnection.getConnection((err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err.message);
                return res.status(500).send("Server error");
            }

            connection.query(checkEmailQuery, [email], (err, result) => {
                if (err) {
                    console.error("Error checking email:", err.message);
                    connection.release(); 
                    return res.status(500).send("Server error");
                }

                if (result.length > 0) {
                    connection.release(); 
                    return res.status(400).json({ message: "Email already exists" });
                }

                const insertQuery = `
                    INSERT INTO signupdetails (email, password, username, classhandling, section, rollno, year) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                connection.query(insertQuery, [email, hashedPassword, username, classHandling, section, rollNo, year], (err, result) => {
                    connection.release();
                    if (err) {
                        console.error("Error inserting new user:", err.message);
                        return res.status(500).send("Server error");
                    }
                    const oddaysquery=`insert into oddays(email) values(?)`;
                   connection.query(oddaysquery,[email],(err,res)=>{
                    if(err){
                        console.log("error",err.message);
                        return res.status(500).send("Server error");
                    }
        
                   })
                    return res.status(200).json({ message: "Signup successful" });
                });
            });
        });
    } catch (error) {
        console.error("Error hashing password:", error.message);
        return res.status(500).send("Server error");
    }
});

module.exports = signuproute;
