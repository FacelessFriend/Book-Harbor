const express = require("express");
const serverConfig = require("./config/serverConfig");
const indexRouter = require("./routes/indexRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

serverConfig(app);

app.use("/api", indexRouter);
app.use(errorMiddleware);

module.exports = app;