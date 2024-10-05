const express = require("express");
const advisoraccept = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");

advisoraccept.post("/advisoraccept", (req, res) => {
    const { item, classs, section, year } = req.body;  
    const id = item.id;            

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

        // Destructure the first result
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

        // Prepare the insert query
        const insertQuery = `
        INSERT INTO acceptedod (
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

        // Execute the insert query
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
            year
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
console.log("byeeeeee///////////////////////////////")
                const fetchQuery = `SELECT * FROM studentoddetails WHERE classs=? AND section=? AND presentyear=?`;
                studentconnection.query(fetchQuery, [classs, section, year], (fetchErr, fetchResult) => {
                    console.log("byeeeeeeeeeee>>>>>>>>>>>>>>>>>>>>>>>>>")

                    if (fetchErr) {
                        console.log("Error fetching remaining OD details:", fetchErr);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    console.log("byeeeeeeeeeee>>>>>>>>>>>>>>>>>>>>>>>>>")
                    // if (fetchResult.length < 1) {
                    //     return res.status(200).json({ message: "No OD right now" });
                    // }
                    console.log("bye")
                     const user=fetchResult
                     console.log(user,"😐😐😐😐😐")
                    console.log("OD accepted successfully:", insertResults);
                    return res.status(201).json({ message: "OD accepted successfully", data: insertResults, user: user });
                });
            });
        });
    });
});

module.exports = advisoraccept;
