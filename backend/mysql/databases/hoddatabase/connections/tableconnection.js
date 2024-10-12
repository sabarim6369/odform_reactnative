const hodconnection=require("./hostconnection")

hodconnection.getConnection((err) => {
    if (err) {
      console.error("Error occurred in connection1:", err.message);
    } else {
      console.log("SQL connection success in hods database");
    }
  });
  require("../tables/signuptable")
  require("../tables/acceptedodhodinternal")
  require("../tables/acceptedodhodexternal")
  require("../tables/rejectedodhod")
require("../tables/geotag")