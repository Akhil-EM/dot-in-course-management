var DataTypes = require("sequelize").DataTypes;
var _candidate_details = require("./candidate_details");

function initModels(sequelize) {
  var candidate_details = _candidate_details(sequelize, DataTypes);


  return {
    candidate_details,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
