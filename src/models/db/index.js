const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../../config/mysql.config");
const { logError, logInfo } = require("../../util/logger");

// new Sequelize('db', 'username', 'password', {

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    socketPath:
      (process.env.ENVIRONMENT || "").trim() === "development"
        ? ""
        : "/var/run/mysqld/mysqld.sock",
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: (log) => {
    // console.log(log);
  },
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("successfully connected to database...");
    // await sequelize.sync({force:true});


  } catch (error) {
    
    logError(__filename, "module", error);
  }
})()


const db = {};
db.User = require("./user.model")(sequelize, DataTypes);
db.Token = require("./tokens.model")(sequelize, DataTypes);
db.UserType = require("./user-type.model")(sequelize, DataTypes);
db.UserDetail = require("./user-detail.model")(sequelize,DataTypes);
db.Course = require("./courses.model")(sequelize,DataTypes);
db.CourseSchedule = require("./course-schedule")(sequelize,DataTypes);
db.CourseParticipant = require("./course-participant")(sequelize,DataTypes);

//associations UserDetail



module.exports = { sequelize, db };
