const express = require("express");
const odapplyinputroute = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");

const odinput = odapplyinputroute.post("/odinput", (req, res) => {
    const { email } = req.body;  
    const query = `SELECT username, section, classhandling, year, rollno FROM signupdetails WHERE BINARY email = ?`;

    studentconnection.query(query, [email], (err, result) => {
        if (err) {
            console.log("Error occurred while fetching user details:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (!result || result.length === 0) {
            console.log("No user found with the provided email.");
            return res.status(404).json({ error: "User not found" });
        }

        const user = result[0];
        const query2 = `
        SELECT 
          SUM(CASE WHEN odtype = 'internal' THEN total_days ELSE 0 END) AS total_internal_od_taken,
          SUM(CASE WHEN odtype = 'external' THEN total_days ELSE 0 END) AS total_external_od_taken
        FROM oddays 
        WHERE BINARY email = ?`;

        studentconnection.query(query2, [email], (err, results) => {
            if (err) {
                console.log("Error occurred while fetching OD details:", err);
                return res.status(500).json({ error: "Internal server error" });
            }

            if (!results || results.length === 0) {
                console.log("No OD details found for the user.");
                return res.status(404).json({ error: "OD details not found" });
            }

            const odtaken = results[0];
            console.log(results[0]);
            console.log("uefbbfr",odtaken);
            res.status(200).json({ details: user, odtaken: odtaken });
        });
    });
});

module.exports = odinput;
