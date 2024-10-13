const express = require("express");
const bcrypt = require("bcrypt");
const loginroute = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");

loginroute.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password." });
    }
    
    const query = "SELECT * FROM signupdetails WHERE email = ?";
    
    studentconnection.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found. Please check the email." });
        }
      
        const user = results[0];
        console.log(".😤😤😤😤😤😤😤",user)
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (isMatch) {
                const { password, ...userDetails } = user; 
                console.log("userdetails🎂🎂🎂🎂🎂🎂🎂",userDetails)
                const oddaysquery = `SELECT * FROM oddays WHERE email = ?`;
                
                studentconnection.query(oddaysquery, [email], (err, oddaysResults) => {
                    if (err) {
                        console.error("Error executing oddays query:", err);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                    const query2 = `
        SELECT 
          SUM(CASE WHEN odtype = 'internal' THEN total_days ELSE 0 END) AS total_internal_od_taken,
          SUM(CASE WHEN odtype = 'external' THEN total_days ELSE 0 END) AS total_external_od_taken
        FROM oddays 
        WHERE email = ?`;
          studentconnection.query(query2,[email],(err,totaldays)=>{
            if(err){
                console.log("error");
            }
            const totalday="select count(*) as unread from studentmessages where email=? and isread=false";
            studentconnection.query(totalday,[email],(tdayerr,tdayres)=>{
                if(tdayerr){
                    console.log("error occured",tdayerr);
                }
                console.log("😐😐😐😐😐😐😐😐😐😐😐")
                console.log(tdayres[0].unread);
                console.log("😐😐😐😐😐😐😐😐😐😐😐")
               const unread=tdayres[0].unread;
          
                   const odtaken=totaldays[0];
                    const oddays = oddaysResults[0];
                    console.log("****************************************😍😍😍😍😍",oddays)
                    console.log("🎉🎉🎉🎉🎉",userDetails)
                    console.log("internaltaken🙌🙌🙌🙌🙌🙌🙌🙌",odtaken.total_internal_od_taken)
                    console.log("internaltaken🙌🙌🙌🙌🙌🙌🙌🙌",odtaken.total_external_od_taken)
                    console.log("unread",unread)
                    return res.status(200).json({ message: "Login successful", user: userDetails, oddays: oddays,odtaken:odtaken,unread:unread});
                });
            })
            })
            } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        });
    });
});

module.exports = loginroute;
