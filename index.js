"use strict";
const express = require("express");
const bodyParser = require("body-parser");
let app = express();
const dotenv = require("dotenv");
dotenv.config();
require("./connection/connect");
const http = require("http");
const v1 = require("./v1/routes");
const models = require("./models/index");
const logger = require('morgan')

app.use(logger())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/v1", v1);

app.use((err, req, res, next) => {
  console.log("error", err)
  return res.send({
    message: err
  })
});

  // Workers can share any TCP connection
  // In this case it is an HTTP server
console.log("HTTP");
http.createServer(app).listen(process.env.PORT, () => {
 console.log("server listening 🌎 on port =>", process.env.PORT);
});



module.exports = app;