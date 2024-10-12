const express = require("express");
const advisorreject = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");

advisorreject.post("/advisorreject", (req, res) => {
    const { id, classs, section, year, reasonofrejection, name, email } = req.body;        

    console.log("ID to fetch details:", id);

    const query = `SELECT * FROM studentoddetails WHERE id=?`;
    studentconnection.query(query, [id], (err, results) => {
        if (err) {
            console.log("Error fetching student details:", err);
            return res.status(500).json({ message: "Error fetching student details" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Student OD details not found" });
        }
        const {
            email: studentEmail, // Renamed to avoid conflict
            rollno,
            username,
            classs,
            section,
            reason,
            applieddate,
            startdate,
            enddate,
            total_days,
            relatedto,
            pdf,
            photo,
            presentyear,
            odtype,
            year,
            appliedtime
        } = results[0]; 

        const insertQuery = `
        INSERT INTO rejectedod (
            email, 
            rollno, 
            username, 
            classs, 
            section, 
            reason, 
            applieddate, 
            startdate, 
            enddate, 
            total_days, 
            relatedto, 
            pdf, 
            photo, 
            presentyear, 
            odtype, 
            year,
            reasonofrejection,
            rejectedby
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Combine name and email for the rejectedby field
        const rejectedBy = `${name} (${email})`;

        teacherconnection.query(insertQuery, [
            studentEmail, // Use student's email
            rollno,
            username,
            classs,
            section,
            reason,
            applieddate,
            startdate,
            enddate,
            total_days,
            relatedto,
            pdf,
            photo,
            presentyear,
            odtype,
            year,
            reasonofrejection,
            rejectedBy // Add name and email to rejectedby column
        ], (insertErr, insertResults) => {
            if (insertErr) {
                console.log("Error inserting rejected OD:", insertErr);
                return res.status(500).json({ message: "Error inserting rejected OD" });
            }
            
            const deleteQuery = `DELETE FROM studentoddetails WHERE id=?`;
            studentconnection.query(deleteQuery, [id], (delErr, deleteResult) => {
                if (delErr) {
                    console.log("Error deleting rejected OD:", delErr);
                    return res.status(500).json({ message: "Error deleting rejected OD" });
                }
               const query2="delete from oddays where email=? and appliedtime=?";
               studentconnection.query(query2,[studentEmail,appliedtime],(delerr,delres)=>{
                if(err){
                    console.log("error occured",err);
                }
           
                return res.status(201).json({ message: "OD rejected successfully" });
            });
        })
        });
    });
});

module.exports = advisorreject;
