const router = require("express").Router();
const userController = require("../../controllers/user.controller");
const { validator, authChecker, roleChecker } = require("../../middleware");
const { staticValidator } = validator;
const { validationStatus, validateRegistration, validateLogin } =
  staticValidator;

router.post(
  "/:userType/register",
  validateRegistration(),
  validationStatus,
  userController.register
);

router.post("/login", validateLogin(), validationStatus, userController.login);
router.delete("/logout",authChecker, userController.logout);

module.exports = router;
