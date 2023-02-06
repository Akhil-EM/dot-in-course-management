const statusCodes = require("../registry/html-status-codes");
const response = require("../models/api/response.model");
const { logError, logInfo } = require("../util/logger");
const {
  generatePasswordHash,
  generateJwtToken,
  verifyJwtToken,
  comparePassword,
} = require("../util/functions/encryption-helpers");

const { db, sequelize } = require("../models/db");
const { User, UserType, Token,UserDetail } = db;

exports.register = async (req, res) => {
  try {
    let { email, password, name } = req.body;
    let userType = req.params.userType;

    let dbUser = await User.findOne({
      where: {
        email,
      },
    });

    if (dbUser)
      return res
        .status(statusCodes.NOT_ACCEPTABLE)
        .json(response("failed", "this email is already in use."));

    //finding user type id
    let { user_type, user_type_id } = await UserType.findOne({
      where: {
        user_type: userType,
      },
    });

    //save user
    let user = await User.create({
      email,
      password: await generatePasswordHash(password),
      user_type_id,
    });

    //save user details
    await UserDetail.create({
      name,
      user_id:user.user_id
    })

    res.json(response("success", "registration is completed successfully"));
  } catch (error) {
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let dbUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!dbUser)
      return res
        .status(statusCodes.NOT_FOUND)
        .json(response("failed", "this email is not registered with us."));

    let passwordCompareRes = await comparePassword(password, dbUser.password);

    if (!passwordCompareRes)
      return res
        .status(statusCodes.NOT_ACCEPTABLE)
        .json(response("failed", "invalid password provided"));

    let { user_type } = await UserType.findOne({
      where: {
        user_type_id: dbUser.user_type_id,
      },
    });

    let token = generateJwtToken({
      userId: dbUser.user_id,
      userType: user_type,
    });
    //save token
    await Token.create({
      token_user_id: dbUser.user_id,
      token,
      token_type: "AUTH",
    });

    res.json(
      response("success", "you are logged in successfully", {
        token,
        userType: user_type,
      })
    );
  } catch (error) {
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};

exports.logout = async (req, res) => {
  try {
    

    await Token.update({
      active:false
    },
    {
      where:{
        token:req.token
      }
    });

    res.json(response("succuss","you have logged out successfully"));

  } catch (error) {
    
    logError(__dirname, "function", error);
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json(response("error", error.message));
  }
};