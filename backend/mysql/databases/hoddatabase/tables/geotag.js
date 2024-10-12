const hodconnection = require("../connections/hostconnection");
const query=`
create table if not exists geotaginternal(
id int primary key auto_increment,
odid int,
photo_url longtext,  
email varchar(100),          
upload_date DATE,
FOREIGN KEY (odid) REFERENCES acceptedodhodinternal(id)
)
`

const geotaginternal=hodconnection.query(query, (err, results) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Table 'geotaginternal' created successfully");
    }
});
module.exports=geotaginternal;