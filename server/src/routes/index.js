const express = require("express");
const router = express.Router();
const authenticationRouter = require("./authentication.routes");
const cookies = require("./cookies.routes");
const user = require("./user.routes");
const blog = require("./blog.routes");

router.use("/authentication", authenticationRouter);
router.use("/cookies", cookies);
router.use("/user", user);
router.use("/blog", blog);

module.exports = router