const studentconnection = require("../connections/hostconnection");

const query = `
CREATE TABLE IF NOT EXISTS oddays (
    id INT PRIMARY KEY AUTO_INCREMENT,
    odtype VARCHAR(100),
    total_days INT default 0,
    email VARCHAR(100),
    appliedtime DATETIME,
    externallimit INT DEFAULT 10, 
    internallimit INT DEFAULT 20 ,
    applieddate date,
    startdate date,
    enddate date
);
`;

const oddaystable=studentconnection.query(query, (err, results) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Table 'oddays' created successfully");
    }
});
module.exports=oddaystable;