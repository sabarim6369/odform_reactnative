const express = require("express");
const odformroute1=express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
odformroute1.post("/odform2",(req,res)=>{
    const{email}=req.body;
    const query = "SELECT * FROM signupdetails WHERE BINARY email = ?";
    
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
       const{...userDetails}=user;
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
        WHERE BINARY email = ?`;
          studentconnection.query(query2,[email],(err,totaldays)=>{
            if(err){
                console.log("error");
            }
            const odtaken=totaldays[0];
            const oddays = oddaysResults[0];
            console.log("****************************************😍😍😍😍😍",oddays)
            console.log("🎉🎉🎉🎉🎉",userDetails)
            console.log("internaltaken🙌🙌🙌🙌🙌🙌🙌🙌",odtaken.total_internal_od_taken)
            console.log("internaltaken🙌🙌🙌🙌🙌🙌🙌🙌",odtaken.total_external_od_taken)
            return res.status(200).json({ message: "OD applied successfully", user: userDetails, oddays: oddays,odtaken:odtaken});

        
    });
})
    })
})

module.exports=odformroute1