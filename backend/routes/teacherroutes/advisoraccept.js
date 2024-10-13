// const express = require("express");
// const advisoraccept = express.Router();
// const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
// const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");

// advisoraccept.post("/advisoraccept", (req, res) => {
//     const { item, classs, section, year } = req.body;  
//     const id = item.id;            

//     console.log("ID to fetch details😍😍😍😍😍:", id);

//     const query = `SELECT * FROM studentoddetails WHERE id=?`;
//     studentconnection.query(query, [id], (err, results) => {
//         if (err) {
//             console.log("Error fetching student details:", err);
//             return res.status(500).json({ message: "Error fetching student details" });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: "Student OD details not found" });
//         }

//         const {
//             email,
//             rollno,
//             username,
//             classs,
//             section,
//             reason,
//             applieddate,
//             startdate,
//             enddate,
//             total_days,
//             relatedto,
//             pdf,
//             photo,
//             presentyear,
//             odtype,
//             year
//         } = results[0]; 

//      const studentEmail=email;
//         var nodemailer = require("nodemailer");
//         var sender = nodemailer.createTransport({
//           service: "gmail",
//           auth: {
//             user: "sabarim6369@gmail.com",
//             pass: "yikd grjl jyag nywa",
//           },
//         });
//         var composemail = {
//           from: "sabarim6369@gmail.com",
//           to: studentEmail,
//           subject: "Mail from Node.js",
//           text: "Your OD has been approved by your advisor. wait for hods action",
//         };
    
//         sender.sendMail(composemail, (err, info) => {
//           if (err) {
//             console.log("Some problem occurred:", err);
//           } else {
//             console.log("Mail sent successfully:", info.response);
//           }
//         });
//         const insertQuery = `
//         INSERT INTO acceptedod (
//             email, 
//             rollno, 
//             username, 
//             classs, 
//             section, 
//             reason, 
//             applieddate, 
//             startdate, 
//             enddate, 
//             total_days, 
//             relatedto, 
//             pdf, 
//             photo, 
//             presentyear, 
//             odtype, 
//             year
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         // Execute the insert query
//         teacherconnection.query(insertQuery, [
//             email,
//             rollno,
//             username,
//             classs,
//             section,
//             reason,
//             applieddate,
//             startdate,
//             enddate,
//             total_days,
//             relatedto,
//             pdf,
//             photo,
//             presentyear,
//             odtype,
//             year
//         ], (insertErr, insertResults) => {
//             if (insertErr) {
//                 console.log("Error inserting accepted OD:", insertErr);
//                 return res.status(500).json({ message: "Error inserting accepted OD" });
//             }
            
//             const deleteQuery = `DELETE FROM studentoddetails WHERE id=?`;
//             studentconnection.query(deleteQuery, [id], (delErr, deleteResult) => {
//                 if (delErr) {
//                     console.log("Error deleting accepted OD:", delErr);
//                     return res.status(500).json({ message: "Error deleting accepted OD" });
//                 }
// console.log("byeeeeee///////////////////////////////")
//                 const fetchQuery = `SELECT * FROM studentoddetails WHERE classs=? AND section=? AND presentyear=?`;
//                 studentconnection.query(fetchQuery, [classs, section, year], (fetchErr, fetchResult) => {
//                     console.log("byeeeeeeeeeee>>>>>>>>>>>>>>>>>>>>>>>>>")

//                     if (fetchErr) {
//                         console.log("Error fetching remaining OD details:", fetchErr);
//                         return res.status(500).json({ message: "Internal server error" });
//                     }
//                     console.log("byeeeeeeeeeee>>>>>>>>>>>>>>>>>>>>>>>>>")
//                     // if (fetchResult.length < 1) {
//                     //     return res.status(200).json({ message: "No OD right now" });
//                     // }
//                     console.log("bye")
//                      const user=fetchResult
//                      console.log(user,"😐😐😐😐😐")
//                     console.log("OD accepted successfully:", insertResults);
//                     return res.status(201).json({ message: "OD accepted successfully", data: insertResults, user: user });
//                 });
//             });
//         });
//     });
// });

// module.exports = advisoraccept;




const express = require("express");
const nodemailer = require("nodemailer");
const advisoraccept = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");

advisoraccept.post("/advisoraccept", (req, res) => {
    const { item, classs, section, year } = req.body;  
    const id = item.id;            

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
            appliedtime
        } = results[0]; 

        const studentEmail = email;

        // // Create transporter for Gmail
        // const sender = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true, // true for 465
        //     auth: {
        //         user: "sabarim6369@gmail.com", // Your email
        //         pass: "yikd grjl jyag nywa", // Your app password
        //     },
        // });

        // // Compose mail
        // const composeMail = {
        //     from: "sabarim6369@gmail.com",
        //     to: studentEmail,
        //     subject: "Mail from Node.js",
        //     text: "Your OD has been approved by your advisor. Wait for HOD's action.",
        // };

        // // Send mail
        // sender.sendMail(composeMail, (err, info) => {
        //     if (err) {
        //         console.log("Some problem occurred:", err);
        //     } else {
        //         console.log("Mail sent successfully:", info.response);
        //     }
        // });
//    const nodemailer=require("nodemailer");
//    const transporter=nodemailer.createTransport({
//     secure:true,
//     host:'smtp.gmail.com',
//     port:465,
//     auth:{
//         user:'sabarim6369@gmail.com',
//         pass:'unniaafnehqgvruv',
//     }
//    })
//    const composemail={
//     from:'sabarim6369@gmail.com',
//     to: studentEmail,
//     subject: "Mail from Node.js",
//     text: "Your OD has been approved by your advisor. Wait for HOD's action.",
//    }
//    transporter.sendMail(composemail,(err,info)=>{
//     if(err){
//         console.log("some problem occurred",err);
//     }
//     else{
//         console.log("mail sent successfully",info.response)
//     }
//    })
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
            year,
            appliedtime
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
            appliedtime
        ], (insertErr, insertResults) => {
            if (insertErr) {
                console.log("Error inserting accepted OD:", insertErr);
                return res.status(500).json({ message: "Error inserting accepted OD" });
            }
            const message=`hello ${username},your ${odtype} od which you applied at ${appliedtime} for ${total_days} days has accepted by your advisor.it is in progress with hod`;
             

         
            const insertQuery1 = `
            INSERT INTO studentmessages (
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
                appliedtime,
                message,
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,now());
            `;
           studentconnection.query(insertQuery1,[
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
            appliedtime,
            message
           ],(error,resultss)=>{
            if(error){
                console.log("error occured",error);
            }
          

            const deleteQuery = `DELETE FROM studentoddetails WHERE id=?`;
            studentconnection.query(deleteQuery, [id], (delErr, deleteResult) => {
                if (delErr) {
                    console.log("Error deleting accepted OD:", delErr);
                    return res.status(500).json({ message: "Error deleting accepted OD" });
                }

                const fetchQuery = `SELECT * FROM studentoddetails WHERE classs=? AND section=? AND presentyear=?`;
                studentconnection.query(fetchQuery, [classs, section, year], (fetchErr, fetchResult) => {
                    if (fetchErr) {
                        console.log("Error fetching remaining OD details:", fetchErr);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    
                    console.log("OD accepted successfully:", insertResults);
                    return res.status(201).json({ message: "OD accepted successfully", data: insertResults, user: fetchResult });
                });
            });
        });
    });
})
});

module.exports = advisoraccept;
