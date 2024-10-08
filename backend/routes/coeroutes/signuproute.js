const express = require("express");
const bcrypt = require("bcrypt");
const signuproute = express.Router();
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection=require("../../mysql/databases/hoddatabase/connections/hostconnection");
signuproute.post("/coesignup",async(req,res)=>{
    const{email,password,name}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const checkEmailQueryStudent = "SELECT * FROM signupdetails WHERE email = ?";
        const checkEmailQueryTeacher = "SELECT * FROM signupdetails WHERE email = ?";
        const checkEmailQueryHOD = "SELECT * FROM signupdetails WHERE email = ?"; 
        const checkEmailQuerycoe="select * from signupdetails where email=?";
        const studentEmailExists = await new Promise((resolve, reject) => {
            studentconnection.query(checkEmailQueryStudent, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });

        const teacherEmailExists = await new Promise((resolve, reject) => {
            teacherconnection.query(checkEmailQueryTeacher, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });

        const hodEmailExists = await new Promise((resolve, reject) => {
            hodconnection.query(checkEmailQueryHOD, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });
        const coeemailexists = await new Promise((resolve, reject) => {
            coeconnection.query(checkEmailQuerycoe, [email], (err, result) => {
                if (err) return reject(err);
                resolve(result.length > 0);
            });
        });

        if (studentEmailExists || teacherEmailExists || hodEmailExists ||coeemailexists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const insertQuery = `
            INSERT INTO signupdetails (email, password, username) 
            VALUES (?, ?, ?)
        `;
        coeconnection.getConnection((err, connection) => {
            if (err) {
                console.error("Error getting connection from pool:", err.message);
                return res.status(500).send("Server error");
            }

            connection.query(insertQuery, [email, hashedPassword, name], (err, result) => {
                connection.release(); 
                if (err) {
                    console.error("Error inserting new user:", err.message);
                    return res.status(500).send("Server error");
                }

                return res.status(200).json({ message: "Signup successful" });
            });
        });
    } catch (error) {
        console.error("Error hashing password:", error.message);
        return res.status(500).send("Server error");
    }
});

module.exports = signuproute;
