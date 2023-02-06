const path = require("path");
const response = require("../models/api/response.model");
const statusCodes = require("../registry/html-status-codes");

function initializeBaseRoutes(app) {
  //application base
  app.get("/", (req, res) =>
    res.json(response("success", "server is up and running"))
  );

}


function initializeApplicationRoutes(app) {
  //routers
  app.use("/users",require("./routes/user.route"));
  app.use("/courses",require("./routes/course.route"));
  
    
  //error catching route
  app.all("*", (req, res) =>
    res
      .status(statusCodes.NOT_FOUND)
      .json(response("failed", "no API endpoint found."))
  );
}

module.exports = { initializeBaseRoutes, initializeApplicationRoutes };