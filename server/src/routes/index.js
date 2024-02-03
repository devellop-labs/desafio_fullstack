const express = require("express");
const router = express.Router();
const authenticationRouter = require("./authentication.routes");
const cookies = require("./cookies.routes");
const user = require("./user.routes");

router.use("/authentication", authenticationRouter);
router.use("/cookies", cookies);
router.use("/user", user);

module.exports = router