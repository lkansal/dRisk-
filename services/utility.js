const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto')
module.exports = {
  hashPasswordUsingBcrypt: async (plainTextPassword) => {
        return bcrypt.hashSync(plainTextPassword, 10);
      },
    
  comparePasswordUsingBcrypt: async (pass, hash) => {
        return bcrypt.compareSync(pass, hash);
  
  },
  jwtSign: async (payload) => {
    try {
      return jwt.sign(payload, process.env.jwtSecretKey, {
        expiresIn: process.env.expiresIn,
      });
    } catch (error) {
      throw error;
    }
  },
  jwtVerify: async (token) => {
    try {
      return jwt.verify(token, process.env.jwtSecretKey);
    } catch (error) {
      throw error;
    }
  },
  jwtRefreshSign: async (payload) => {
    try {
      return jwt.sign(payload, process.env.jwtRefreshSecretKey, {});
    } catch (error) {
      throw error;
    }
  },
  generateRandomString: (n) => {
    return crypto.randomBytes(n).toString("hex");
  },
  getJwtExpireTime: async () => {
    return (
      Math.floor(new Date().getTime() / 1000) +
      parseInt(process.env.expiresIn.replace("s", ""))
    );
  },
}