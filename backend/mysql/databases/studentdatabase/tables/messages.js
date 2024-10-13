
const studentconnection = require("../connections/hostconnection");

const query=`
CREATE TABLE IF NOT EXISTS studentmessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
   email varchar(100),
   rollno varchar(100),
    username VARCHAR(255) NOT NULL,
    classs VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    applieddate DATETIME NOT NULL,
    startdate DATETIME NOT NULL,
    enddate DATETIME NOT NULL,
    total_days INT NOT NULL,
    relatedto VARCHAR(255),
    pdf longtext,
    photo longtext,
    presentyear int ,
    odtype varchar(100),
    appliedtime datetime,
    year int,
    message text,
isread boolean default false,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 rejectedby varchar(100),
 reasonofrejection varchar(100)
);
`
const message=studentconnection.query(query, (err, results) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Table 'studentmessages'created successfully");
    }
});
module.exports=message;