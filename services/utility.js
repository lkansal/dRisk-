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
}