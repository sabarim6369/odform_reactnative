

const express = require("express");
const nodemailer = require("nodemailer");
const coeaccept = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection=require("../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");
coeaccept.post("/coeaccept", (req, res) => {
    const { item} = req.body;  
    const id = item.id;            

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

        const studentEmail = email;
        const insertQuery = `
        INSERT INTO acceptedodcoe(
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        coeconnection.query(insertQuery, [
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
        ], (insertErr, insertResults) => {
            if (insertErr) {
                console.log("Error inserting accepted OD:", insertErr);
                return res.status(500).json({ message: "Error inserting accepted OD" });
            }
            
            const deleteQuery = `DELETE FROM acceptedodhodexternal WHERE id=?`;
            hodconnection.query(deleteQuery, [id], (delErr, deleteResult) => {
                if (delErr) {
                    console.log("Error deleting accepted OD:", delErr);
                    return res.status(500).json({ message: "Error deleting accepted OD" });
                }
                if(year===1){
                    const fetchQuery = `SELECT * FROM acceptedodhodexternal WHERE presentyear=?`;
                   hodconnection.query(fetchQuery, [year], (fetchErr, fetchResult) => {
                        if (fetchErr) {
                            console.log("Error fetching remaining OD details:", fetchErr);
                            return res.status(500).json({ message: "Internal server error" });
                        }
                        
                        console.log("OD accepted successfully:", insertResults);
                        return res.status(201).json({ message: "OD accepted successfully", data: insertResults, user: fetchResult });
                    });
                }
                else{
                    const fetchQuery = `SELECT * FROM acceptedodhodexternal WHERE classs=? AND presentyear>1`;
                    hodconnection.query(fetchQuery, [classs, year], (fetchErr, fetchResult) => {
                        if (fetchErr) {
                            console.log("Error fetching remaining OD details:", fetchErr);
                            return res.status(500).json({ message: "Internal server error" });
                        }
                        
                        console.log("OD accepted successfully:", insertResults);
                        return res.status(201).json({ message: "OD accepted successfully", data: insertResults, user: fetchResult });
                    });
                }
              
            });
        });
    });
});

module.exports = coeaccept;
