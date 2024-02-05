const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller")

router.post("/signup", AuthenticationController.signUpController)/
router.post("/signin", AuthenticationController.signInController);


module.exports = router