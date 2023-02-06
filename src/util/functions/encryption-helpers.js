const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateJwtToken = (data, time) => {
  if (time) return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: time });
  return jwt.sign(data, process.env.JWT_SECRET);
};

const verifyJwtToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET);
}

const generatePasswordHash = async (password)=>{
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
}

const comparePassword = (password,passwordHash)=>{
   return bcrypt.compare(password,passwordHash);
}

module.exports = {
    generateJwtToken,
    verifyJwtToken,
    generatePasswordHash,
    comparePassword
}