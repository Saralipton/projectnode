const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

mongoose.connection.on("success", () => {
  console.log("Connection to DB Successful!");
});

module.exports = mongoose;
