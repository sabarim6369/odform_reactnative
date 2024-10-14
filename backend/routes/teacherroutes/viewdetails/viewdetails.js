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
         query = `SELECT * FROM studentoddetails WHERE id=?`;
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
        // const query1="select g.photo_url as photo from acceptedodcoe as a left join geotagexternal as g on a.id=g.odid where a.id=?";
        //  const query2=`select * from acceptedodcoe where id=?`;
        // connection=coeconnection;
        // connection.query(query1,[id],(error1,result1)=>{
        //     if(error1){
        //         console.log("error occured",error1);
        //     }
        //     connection.query(query2,[id],(error2,result2)=>{
        //         if(error2){
        //             console.log("error occured",error2);
        //         }
        //         const mergedResult = {
        //             ...result2[0], 
        //             photo: result1.length > 0 ? result1[0].photo : null
        //         };
        //         return res.status(200).json({user:mergedResult})
        //     })
        // })
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