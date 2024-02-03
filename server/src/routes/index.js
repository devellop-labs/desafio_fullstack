const express = require("express");
const router = express.Router();
const authenticationRouter = require("./authentication.routes");
const cookies = require("./cookies.routes");

router.use("/authentication", authenticationRouter);
router.use("/cookies", cookies);

module.exports = router