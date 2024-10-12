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

    if(odtype==='internal'|| odtype==='external'){
        switch (category) {
            case "inProgressAdvisor":
                query = `SELECT * FROM studentoddetails WHERE email=? and odtype=?`;
                connection=studentconnection;
                break;
            case "inProgressHOD":
                query = `SELECT * FROM acceptedod WHERE email=? and odtype=?`;
                connection = teacherconnection;
                break;
            case "inProgresscoe":
                query = `SELECT * FROM acceptedodhodexternal WHERE email=?` ;
                connection = hodconnection;
                break;
            case "inProgressJioTagexternal":
                query = "SELECT * FROM acceptedodcoe WHERE email=? and isActive=TRUE";
                connection = coeconnection;
                break;
                
            case "inProgressJioTaginternal":
                query = "SELECT * FROM acceptedodcoe WHERE email=?";
                connection = coeconnection;
                break;
    
            case "accepted":
                query = `SELECT * FROM accepted WHERE email=? and odtype=?`;
                connection=studentconnection
                break;
            case "rejected":
                query = `SELECT * FROM rejectedod WHERE email=? and odtype=?`;
                connection=teacherconnection
                break;
            default:
                return res.status(400).send({ message: "Invalid category provided" }); // Return if no valid category
        }
    }
       else{
        switch (category) {
            case "inProgressAdvisor":
                query = `SELECT * FROM studentoddetails WHERE email=?`;
                connection=studentconnection;
                break;
            case "inProgressHOD":
                query = `SELECT * FROM acceptedod WHERE email=?`;
                connection = teacherconnection;
                break;
            case "inProgresscoe":
                query = `SELECT * FROM acceptedodhodexternal WHERE email=?` ;
                connection = hodconnection;
                break;
            case "inProgressJioTagexternal":
                query = "SELECT * FROM acceptedodcoe WHERE email=?";
                connection = coeconnection;
                break;
                
            case "inProgressJioTaginternal":
                query = "SELECT * FROM acceptedodcoe WHERE email=?";
                connection = coeconnection;
                break;
    
            case "accepted":
                query = `SELECT * FROM accepted WHERE email=?`;
                connection=studentconnection
                break;
            case "rejected":
                query = `SELECT * FROM rejectedod WHERE email=?`;
                connection=teacherconnection
                break;
            default:
                return res.status(400).send({ message: "Invalid category provided" }); // Return if no valid category
        }
    
        
    }
   
    // Execute the query
    connection.query(query, [email,odtype], (err, result) => {
        if (err) {
            console.log("Error occurred:", err);
            return res.status(400).send({ message: "Error occurred" });
        }
        res.status(200).json({ results: result });
    });
});

module.exports = previousodroute;
