const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let url = `mongodb://localhost:27017/dRisk`;
  mongoose.connect(
    url, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    },
    function (err) {
      console.log(url);
      if (err) {
        console.log("mongoose Error ", err);
      } else {
        console.log("connected to mongodb");
      }
    }
  );

module.exports = mongoose;