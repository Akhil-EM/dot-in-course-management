module.exports = {
    authChecker:require("./auth.middleware"),
    roleChecker:require("./role-check.middleware"),
    validator:{
      staticValidator:require("./validation/static.validator")
    }
}