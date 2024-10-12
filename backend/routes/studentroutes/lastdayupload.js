const express = require("express");
const lastdayupload = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection = require("../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");

lastdayupload.post("/lastdayupload", (req, res) => {
    const { id, email, type } = req.body;
    let query = '';
    let connection = coeconnection;
    let table = '';
console.log("hiiiiii")
    if (type === "external") {
        query = `SELECT * FROM ?? WHERE id = ?`;
        table = "acceptedodcoe";
        connection = coeconnection;
    } else if (type === "internal") {
        query = `SELECT * FROM ?? WHERE id = ?`;
        table = "acceptedodhodinternal";
        connection = hodconnection;
    }

    connection.query(query, [table, id], async (error, selectResult) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: "Database query error." });
        }

        if (selectResult.length === 0) {
            return res.status(404).json({ message: "Record not found." });
        }

        const {
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
            appliedtime,
            year
        } = selectResult[0]; 
        const insertQuery = `
            INSERT INTO accepted (email, rollno, username, classs, section, reason, applieddate, startdate, enddate, total_days, relatedto, pdf, photo, presentyear, appliedtime, year)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        studentconnection.query(insertQuery, [email, rollno, username, classs, section, reason, applieddate, startdate, enddate, total_days, relatedto, pdf, photo, presentyear, appliedtime, year], (insertError, insertResult) => {
            if (insertError) {
                console.log(insertError)
                return res.status(500).json({ error: "Failed to insert into accepted table." });
            }

            const updateQuery = `UPDATE ?? SET isActive = FALSE WHERE id = ?`;
            connection.query(updateQuery, [table, id], (deleteError, deleteResult) => {
                if (deleteError) {
                    console.log(deleteError)
                    return res.status(500).json({ error: "Failed to delete from previous table." });
                }

                res.status(200).json({ message: "Successfully uploaded to accepted history and deleted from previous table.", result: insertResult });
            });
        });
    });
});

module.exports = lastdayupload;
