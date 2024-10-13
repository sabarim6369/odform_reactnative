const express=require("express");
const viewdetails=express.Router();
const teacherconnection = require("../../../mysql/databases/teacherdatabase/connections/hostconnection");
const studentconnection = require("../../../mysql/databases/studentdatabase/connections/hostconnection");
const hodconnection=require("../../../mysql/databases/hoddatabase/connections/hostconnection")
const coeconnection=require("../../../mysql/databases/coedatabase/connections/hostconnection")
viewdetails.post("/viewdetails",(req,res)=>{
    
    const{id,type}=req.body;  
    let connection=studentconnection;
    let query='';
    if(type==="registeredodadvisor"){
         query = `SELECT * FROM studentoddetails WHERE id=?`;    //test@sece.ac.in //test@123
        connection=studentconnection;
    }
    else if(type==="acceptedodadvisor"){
         query=`select * from acceptedod where id=?`;
        connection=teacherconnection;
    }
    else if(type==="rejectedodadvisor"){
         query="select * from rejectedod where id=?";
        connection=teacherconnection;
    }
    else if(type==="registeredodhod"){
         query=`select * from acceptedod where id=?`;
        connection=teacherconnection;
    }
    else if(type==="acceptedodhodinternal"){
         query=`select * from acceptedodhodinternal where id=?`;
        connection=hodconnection;
    }
    else if(type==="acceptedodhodexternal"){
        query="select * from acceptedodhodexternal where id=?";
        connection=hodconnection;
    }
    else if(type==="rejectedodhod"){
         query=`select * from rejectedodhod where id=?`;
        connection=hodconnection;
    }
    else if(type==="registeredodcoeinternal"){
         query=`select * from acceptedodhodinternal where id=?`;
        connection=hodconnection;
    }
    else if(type==="registeredodcoeexternal"){
        query="select * from acceptedodhodexternal where id=?";
        connection=hodconnection;
    }
    else if(type==="acceptedodcoe"){
         query=`select * from acceptedodcoe where id=?`;
        connection=coeconnection;
    }
    else if(type==="rejectedodcoe"){
         query=`select * from rejectedodcoe where id=?`;
        connection=coeconnection;
    }
    else if(type==="accepted"){
        query=`select * from accepted where id=?`;
        connection=studentconnection;
    }
    else if(type==="message"){
        query=`select * from studentmessages where id=?`;
        connection=studentconnection
    }
    console.log("❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥",id)

    connection.query(query, [id], (err, results) => {
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