const coeconnection = require("../connections/hostconnection");
const query=`
create table if not exists geotag(
id int primary key auto_increment,
odid int,
photo_url VARCHAR(255),            
upload_date DATE,
FOREIGN KEY (odid) REFERENCES final_table(id)
)
`
