const express = require("express");
const router = express.Router();
const authenticationRouter = require("./authentication.routes");

router.use("/authentication", authenticationRouter);

module.exports = router