const express = require("express");
const coereject = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");
const hodconnection=require("../../mysql/databases/hoddatabase/connections/hostconnection");
coereject.post("/coereject", (req, res) => {
    const { id, reasonofrejection, name, email } = req.body;        

    console.log("ID to fetch details:", id);

    const query = `SELECT * FROM acceptedodhodexternal WHERE id=?`;
    hodconnection.query(query, [id], (err, results) => {
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
            tid
        } = results[0]; 
        const insertQuery = `
        INSERT INTO rejectedodcoe (
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

        
        const rejectedBy = `${name} (${email})`;

        coeconnection.query(insertQuery, [
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
            
            const deleteQuery = `DELETE FROM acceptedodhodexternal WHERE id=?`;
            hodconnection.query(deleteQuery, [id], (delErr, deleteResult) => {
                if (delErr) {
                    console.log("Error deleting rejected OD:", delErr);
                    return res.status(500).json({ message: "Error deleting rejected OD" });
                }
                const teacherdeletequery="delete from acceptedod where id=?";
                teacherconnection.query(teacherdeletequery,[tid],(err,teacherdel)=>{
                    if(err){
                        console.log("error",teacherdel);
                    }
                return res.status(201).json({ message: "OD rejected successfully" });
            });
        })
        });
    });
});

module.exports = coereject;
