const teacherconnection=require("./hostconnection")
teacherconnection.getConnection((err) => {
    if (err) {
      console.error("Error occurred in connection1:", err.message);
    } else {
      console.log("SQL connection success in teacher database");
    }
  });
require("../tables/signuptable");
require("../tables/acceptedod");
require("../tables/rejectedod");