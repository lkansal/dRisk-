const express = require("express");
const user = require("./userRoutes");
const route = express.Router();

route.use("/user", user);

module.exports = route;
