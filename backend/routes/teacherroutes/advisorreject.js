const express = require("express");
const advisorreject = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");

advisorreject.post("/advisorreject", (req, res) => {
    const { id, classs, section, year,reasonofrejection} = req.body;        

    console.log("ID to fetch details😍😍😍😍😍:", id);

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
            year
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
            reasonofrejection
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `;
        teacherconnection.query(insertQuery, [
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
            reasonofrejection
        ], (insertErr, insertResults) => {
            if (insertErr) {
                console.log("Error inserting accepted OD:", insertErr);
                return res.status(500).json({ message: "Error inserting accepted OD" });
            }
            
            const deleteQuery = `DELETE FROM studentoddetails WHERE id=?`;
            studentconnection.query(deleteQuery, [id], (delErr, deleteResult) => {
                if (delErr) {
                    console.log("Error deleting accepted OD:", delErr);
                    return res.status(500).json({ message: "Error deleting accepted OD" });
                }
               
                    return res.status(201).json({ message: "OD rejected successfully"});
                });
            });
        });
    });
module.exports=advisorreject;