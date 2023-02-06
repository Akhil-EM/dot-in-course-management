const statusCodes = require("../registry/html-status-codes");
const responseModel = require("../models/api/response.model");
const {logError} = require("../util/logger");
const { verifyJwtToken } = require("../util/functions/encryption-helpers")
const { db } = require("../models/db");
const {Token} = db;

module.exports = async function(req, res, next) {

    //getting token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //either undefined or the token

    try {

        if (!token) {
          return res
            .status(statusCodes.NOT_FOUND)
            .json(responseModel("failed", "token not found"));
        } else {
          let tokenResult = await Token.findOne({ where: { token,active:true } });
          if (!tokenResult)
            return res
              .status(statusCodes.NOT_ACCEPTABLE)
              .json(responseModel("failed", "invalid token"));

          let user = await verifyJwtToken(token);
          req.user = user;
          req.token = token;
          
          next();
          
        }

    } catch (error) {
        logError(__filename,"middleware",error.message)
    }
    
  }