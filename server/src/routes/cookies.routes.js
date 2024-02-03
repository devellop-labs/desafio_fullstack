const express = require("express");
const router = express.Router();
const CookiesController = require("../controllers/cookies.controller");
const verifyTokenMiddleware = require("../middleware/jwt");

router.get("/reset", CookiesController.resetCookies);
router.get("/check", verifyTokenMiddleware, CookiesController.checkCookies);

module.exports = router
