const teacherconnection=require("../connections/hostconnection")
const query=`create table if not exists signupdetails(
id int primary key auto_increment,
username varchar(100),
email varchar(100),
password varchar(100),
classhandling varchar(100),
section varchar(100),
year int)`
const signuptable=teacherconnection.query(query,(err,results)=>{
    if(err){
        console.log("error occcured",err);
    }
    else{
        console.log("table teacher signupdetails created successfully");
    }
})
module.exports=signuptable;