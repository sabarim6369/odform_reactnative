const studentconnection=require("./hostconnection")
studentconnection.getConnection((err) => {
    if (err) {
      console.error("Error occurred in connection1:", err.message);
    } else {
      console.log("SQL connection success in student database");
    }
  });
require("../tables/signupdetails");
require("../tables/odtype")
require("../tables/oddetails")
require("../tables/externalod");
require("../tables/internalod");
require("../tables/acceptedodfinal")
require("../tables/messages")