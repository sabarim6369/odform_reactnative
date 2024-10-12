
const teacherconnection = require("../connections/hostconnection");
const query=`
create table if not exists rejectedod(
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
    year int,
    reasonofrejection varchar(1000),
    rejectedby varchar(100),
    appliedtime DATETIME
)
`

const rejectedadvisor=teacherconnection.query(query, (err, results) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Table 'rejectedod' created successfully");
    }
});
module.exports=rejectedadvisor;