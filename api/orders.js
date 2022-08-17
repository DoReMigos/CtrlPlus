const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");
const {User, Cart, Order} = require("../db/models");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = apiRouter