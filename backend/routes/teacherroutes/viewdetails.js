const express=require("express");
const viewdetails=express.Router();
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
viewdetails.post("/viewdetails",(req,res)=>{
    
    const{id}=req.body;
    console.log("❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥",id)
    const query = `SELECT * FROM studentoddetails WHERE id=?`;
    studentconnection.query(query, [id], (err, results) => {
        if (err) {
            console.log("Error fetching student details:", err);
            return res.status(500).json({ message: "Error fetching student details" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Student OD details not found" });
        }
       const user=results[0];
       console.log(user)
       return res.status(200).json({user:user});
    })
})
module.exports=viewdetails