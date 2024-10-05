const hodconnection=require("../connections/hostconnection");
const query=`
create table if not exists signupdetails(
email varchar(100) unique,
id int primary key auto_increment,
username varchar(100),
password varchar(100),
year int,
department varchar(100)
)
`
const signuptable=hodconnection.query(query,(err,res)=>{
    if(err){
        console.log("error occcured",err);
    }
    else{
        console.log("table hod signupdetails created successfully");
    }
})
module.exports=signuptable;