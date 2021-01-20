const compression = require("compression");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { env } = require("./../../../config");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../../swagger.json");
const { errorHandler } = require("bodymen");

module.exports = (apiRoot, routes) => {
  const app = express();

  /* istanbul ignore next */
  if (env === "production" || env === "development") {
    app.use(cors());
    app.use(compression());
    app.use(morgan("dev"));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get("/", (req, res) => {
    res.status(200).json({
      message: "welcome to my project",
    });
  });
  app.use(apiRoot, routes);
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(errorHandler());

  app.use((error, req, res, next) => {
    console.log(error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  });

  return app;
};
