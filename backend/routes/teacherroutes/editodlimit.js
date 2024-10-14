const express=require("express");
const editodlimit=express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
editodlimit.post("/editodlimit",(req,res)=>{
    const{email}=req.body;
    console.log(email);
    const query=`
    select
    odtypes.odtype, 
      IFNULL(SUM(oddays.total_days), 0) AS totaldays
  FROM    
      (SELECT 'Internal' AS odtype UNION SELECT 'External') AS odtypes
  LEFT JOIN 
      oddays ON odtypes.odtype = oddays.odtype AND oddays.email =?
  GROUP BY odtypes.odtype;

`;
const query2=`select internallimit,externallimit from oddays where BINARY email=? limit 1`
    studentconnection.query(query,[email],(err,results)=>{
        if(err){
            console.log("error occured");
        }
        console.log(results)
        console.log(results[0].totaldays);
        console.log(results[1].totaldays);
        studentconnection.query(query2,[email],(error,result)=>{
            if(error){
                console.log("error occured");
            }
       console.log(result[0].internallimit)
       console.log(result[0].externallimit)
        
        res.status(200).json({internal:results[0].totaldays,external:results[1].totaldays,internallimit:result[0].internallimit,externallimit:result[0].externallimit});
    })
})
})
module.exports=editodlimit