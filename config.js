const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT,
  apiRoot: process.env.API_ROOT || "",
  env: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
};
