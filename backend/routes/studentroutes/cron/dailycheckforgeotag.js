const express=require("express");
const cron = require('node-cron');

const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection = require("../../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../../mysql/databases/coedatabase/connections/hostconnection");




const markInactiveAndMoveToRejected = async () => {

    const submittedQuery = `
        SELECT a.id
        FROM acceptedodcoe a
        LEFT JOIN geotagexternal g ON a.id = g.odid AND DATE(g.upload_date) = CURDATE()
        WHERE a.isActive = TRUE AND g.odid IS NOT NULL;
    `;

    coeconnection.query(submittedQuery, (error, submittedResults) => {
        if (error) throw error;

        const submittedIds = new Set(submittedResults.map(student => student.id));

        const allActiveQuery = `
            SELECT *
            FROM acceptedodcoe
            WHERE isActive = TRUE;
        `;

        coeconnection.query(allActiveQuery, (allActiveError, allActiveResults) => {
            if (allActiveError) throw allActiveError;

            allActiveResults.forEach(student => {
                if (!submittedIds.has(student.id)) {
                    const updateQuery = `UPDATE acceptedodcoe SET isActive = FALSE WHERE id = ?`;
                    coeconnection.query(updateQuery, [student.id], (updateError) => {
                        if (updateError) throw updateError;

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
                        const reason=`not uploaded geotag`;
                        const rejectedBy = "System";
                        teacherconnection.query(insertQuery, [ student.email,
                            student.rollno,
                            student.username,
                            student.classs,
                            student.section,
                            student.reason,
                            student.applieddate,
                            student.startdate,
                            student.enddate,
                            student.total_days,
                            student.relatedto,
                            student.pdf,
                            student.photo,
                            student.presentyear,
                            student.odtype,
                            student.year,
                            reason,
                            rejectedBy], (insertError) => {
                            if (insertError) throw insertError;

                            const query2="delete from oddays where email=? and appliedtime=?";
                            studentconnection.query(query2,[student.email,student.appliedtime],(delerr,delres)=>{
                             if(delerr){
                                 console.log("error occured",delerr)
                             }
                            console.log(`Student ${student.username} marked as inactive and moved to rejectedod.`);
                        });
                    });
                    });
                }
            });
        });
    });
};


cron.schedule('59 23 * * *', async () => {
    console.log('Running daily task to check geotag submissions...');
    await markInactiveAndMoveToRejected();
});
module.exports={}