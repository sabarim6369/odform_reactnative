const coeconnection = require("../connections/hostconnection");
const query=`
create table if not exists geotagexternal(
id int primary key auto_increment,
odid int,
photo_url longtext,  
email varchar(100),          
upload_date DATETIME,
FOREIGN KEY (odid) REFERENCES acceptedodcoe(id)
)
`

const geotagexternal=coeconnection.query(query, (err, results) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Table 'geotagexternal' created successfully");
    }
});
module.exports=geotagexternal;