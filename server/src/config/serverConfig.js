const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Authorization", "Content-Type"], 
    credentials: true,
  }))  
};

module.exports = serverConfig;
