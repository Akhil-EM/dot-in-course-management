const {
    body,
    param,
    query,
    validationResult,
    check,
  } = require("express-validator");

const response = require("../../models/api/response.model");
const statusCodes = require("../../registry/html-status-codes");
const { date1, time1 } = require("../../registry/regex");

const validationStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res
    .status(statusCodes.UNPROCESSABLE_ENTITY)
    .json(response("failed", "validation errors", { errors: extractedErrors }));
};

const validateRegistration = () => {
  return [
    body("email", "not a valid email id").trim().isEmail(),
    body(
      "password",
      "provide a password with at least five characters"
    ).trim().isLength({ min: 5 }),
    body(
      "name",
      "name required"
    ).trim().isLength({ min: 3 }),
    param("userType","userType must be user or candidate").trim().toLowerCase()
                     .isIn(["teacher","student"])
  ];
};


const validateLogin = () => {
    return [
      body("email", "not a valid email id").trim().isEmail(),
      body(
        "password",
        "provide a password with at least five characters"
      ).trim().isLength({ min: 5 })
    ];
};



const validateCourse = () => {
  return [
    body("name", "required").trim().not().isEmpty(),
    body(
      "details",
      "required"
    ).trim().not().isEmpty(),
    body(
      "duration",
      "required in days"
    ).trim().not().isEmpty(),
    body("startDate").custom((date) => {
      if (!date1.test(date)) {
        return Promise.reject("date must of (yyyy-mm-dd) format");
      } else {
        return true;
      }
    }),
    body("fromTime").custom((from) => {
      if (!time1.test(from)) {
        return Promise.reject("from time must of (hh:mm:ss) format");
      } else {
        return true;
      }
    })
  ];
};
const validateCourseJoinOrLeave = () => {
  return [
    param("courseStatus","courseStatus must be join or leave").trim().toLowerCase()
    .isIn(["join","leave"])
  ];
};



module.exports = {
    validationStatus,
    validateRegistration,
    validateLogin,
    validateCourse,
    validateCourseJoinOrLeave
}