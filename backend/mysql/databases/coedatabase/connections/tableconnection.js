const coeconnection=require("./hostconnection")

coeconnection.getConnection((err) => {
    if (err) {
      console.error("Error occurred in connection1:", err.message);
    } else {
      console.log("SQL connection success in coes database");
    }
  });
 require("../tables/signuptable")
 require("../tables/acceptedodcoe")
 require("../tables/rejectedodcoe")
require("../tables/subfinal")
require("../tables/geotag")