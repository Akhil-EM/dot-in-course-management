let environment = process.env.ENVIRONMENT;
environment = "development";
let logger;
const { createLogger, format, transports } = require("winston");
const moment = require("moment");

if (environment === "development") {
  logger = createLogger({
    format: format.combine(format.json(), format.prettyPrint()),
    transports: [new transports.Console()],
  });
}

if (environment == "production") {
  logger = createLogger({
    format: format.combine(format.json(), format.prettyPrint()),
    transports: [new transports.File({ filename: "public/logs/app.log" })],
  });
}

const logInfo = (file = file, type = "function", message = "") => {
  logger.log({
    level: "info",
    date: moment().format("Do MMMM YYYY, h:mm:ss a"),
    file: file,
    type: type,
    message: message,
  });
};

const logError = (file = file, type = "function", message = "") => {
  logger.log({
    level: "error",
    date: moment().format("Do MMMM YYYY, h:mm:ss a"),
    file: file,
    type: type,
    message: message+"",
  });
};

module.exports = { logInfo, logError };
