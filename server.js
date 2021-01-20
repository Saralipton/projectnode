const http = require("http");
const { env, port, apiRoot, mongoUri } = require("./config");
const express = require("./src/services/express");
const api = require("./src/apis");
const mongoose = require("./src/services/mongoose");

const app = express(apiRoot, api);
const server = http.createServer(app);

if (mongoUri) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

setImmediate(() => {
  server.listen(process.env.PORT, (req, res) => {
    console.log(
      `Express server listening on http://localhost:${process.env.PORT}, in ${env} mode`
    );
  });
});
