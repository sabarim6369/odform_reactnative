
const studentconnection = require("../connections/hostconnection");
const query=`
create table if not exists externalod(
    id int primary key auto_increment,
    email varchar(100),
    rollno varchar(100),
    username VARCHAR(255) NOT NULL,
    classs VARCHAR(50) NOT NULL,
    section VARCHAR(50) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    applieddate DATE NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    total_days INT NOT NULL,
    relatedto VARCHAR(255),
    pdf longtext,
    photo longtext,
    presentyear int,
    appliedtime datetime,year int)
`


const externalod=studentconnection.query(query, (err, results) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Table 'externalod' created successfully");
    }
});
module.exports=externalod;