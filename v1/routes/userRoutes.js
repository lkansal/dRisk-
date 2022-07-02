const express = require("express");
const userRepo = require("../controller/userController");
const authService = require("../../services/authservice")
let userRoutes = express.Router();

userRoutes.post("/signup", userRepo.signUp);
userRoutes.post("/signin", userRepo.signin);

module.exports = userRoutes;