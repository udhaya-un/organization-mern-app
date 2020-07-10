const employees = require("./employee.router");
const organization = require("./organization.router");

module.exports = (app) => {
  app.use("/api/v1/employee", employees);
  app.use("/api/v1/organization", organization);
};
