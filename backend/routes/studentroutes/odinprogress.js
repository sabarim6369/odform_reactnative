const express = require("express");
const odinprogress = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection = require("../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");
odinprogress.post("/fetchResultsByCategoryods",(req,res)=>{
    const{category,email}=req.body;
    let query='';
    if(category==="internalOD"){
        query=`SELECT * FROM studentoddetails WHERE email=? and odtype="internal"`;
        odtype='internal'
    }
    else if(category==="external"){
        query=`SELECT * FROM studentoddetails WHERE email=? and odtype="external"`;
        odtype='external'
    }
    else{
        console.log("😪😪😪😪😪😪")
        query=`select * from studentoddetails where email=?`;
    }
    studentconnection.query(query, [email], (err, result) => {
        if (err) {
            console.log("Error occurred:", err);
            return res.status(400).send({ message: "Error occurred" });
        }
        res.status(200).json({ results: result });
    });
})

module.exports=odinprogress;