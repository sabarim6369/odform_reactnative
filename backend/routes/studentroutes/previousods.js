const express = require("express");
const previousodroute = express.Router();
const studentconnection = require("../../mysql/databases/studentdatabase/connections/hostconnection");
const teacherconnection = require("../../mysql/databases/teacherdatabase/connections/hostconnection");
const hodconnection = require("../../mysql/databases/hoddatabase/connections/hostconnection");
const coeconnection = require("../../mysql/databases/coedatabase/connections/hostconnection");

previousodroute.post("/fetchResultsByCategory", (req, res) => {
    const { category, email,odtype} = req.body;
    let connection = studentconnection;
    let query = '';
console.log(category,email,odtype)
    if(odtype==='internal'|| odtype==='external'){
        switch (category) {
            case "inProgressAdvisor":
                query = `SELECT * FROM studentoddetails WHERE BINARY email=? and odtype=?`;
                connection=studentconnection;
                break;
            case "inProgressHOD":
                query = `SELECT * FROM acceptedod WHERE BINARY email=? and odtype=?`;
                connection = teacherconnection;
                break;
            case "inProgresscoe":
                query = `SELECT * FROM acceptedodhodexternal WHERE BINARY email=?` ;
                connection = hodconnection;
                break;
            case "inProgressJioTagexternal":
                query = "SELECT * FROM acceptedodcoe WHERE BINARY email=? and isActive=TRUE";
                connection = coeconnection;
                break;
                
            case "inProgressJioTaginternal":
                query = `SELECT * FROM acceptedodhodinternal WHERE BINARY email=? AND isActive=TRUE`;
                connection = hodconnection;
                break;
    
            case "accepted":
                query = `SELECT * FROM accepted WHERE BINARY email=? and odtype=?`;
                connection=studentconnection
                break;
            case "rejected":
                query = `SELECT * FROM rejectedod WHERE BINARY email=? and odtype=?`;
                connection=teacherconnection
                break;
            default:
                return res.status(400).send({ message: "Invalid category provided" }); 
        }
    }
       else{
        switch (category) {
            case "inProgressAdvisor":
                query = `SELECT * FROM studentoddetails WHERE BINARY email=?`;
                connection=studentconnection;
                break;
            case "inProgressHOD":
                query = `SELECT * FROM acceptedod WHERE BINARY email=?`;
                connection = teacherconnection;
                break;
            case "inProgresscoe":
                query = `SELECT * FROM acceptedodhodexternal WHERE BINARY email=?` ;
                connection = hodconnection;
                break;
            case "inProgressJioTagexternal":
                query = "SELECT * FROM acceptedodcoe WHERE BINARY email=?";
                connection = coeconnection;
                break;
                
            case "inProgressJioTaginternal":
                query = "SELECT * FROM acceptedodhodinternal WHERE email=?";
                connection = hodconnection;
                break;
    
            case "accepted":
                query = `SELECT * FROM accepted WHERE BINARY email=?`;
                connection=studentconnection
                break;
            case "rejected":
                query = `SELECT * FROM rejectedod WHERE BINARY email=?`;
                connection=teacherconnection
                break;
            default:
                return res.status(400).send({ message: "Invalid category provided" }); // Return if no valid category
        }
    
        
    }
   
   
    connection.query(query, [email,odtype], (err, result) => {
        if (err) {
            console.log("Error occurred:", err);
            return res.status(400).send({ message: "Error occurred" });
        }
        console.log(result)
        res.status(200).json({ results: result });
    });
});

module.exports = previousodroute;
