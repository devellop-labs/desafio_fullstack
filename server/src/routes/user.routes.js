const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller")
const verifyTokenMiddleware = require("../middleware/jwt");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.get("/get_information", verifyTokenMiddleware, UserController.getUserInformation);
router.put("/update_user_information", upload.single('ProfileImage'), verifyTokenMiddleware, UserController.updateUserInformation);
router.put("/update_user_password", verifyTokenMiddleware, UserController.updateUserPassword);
router.delete("/delete_user_image", verifyTokenMiddleware, UserController.deleteUserImage); 
router.delete("/delete_user_account", verifyTokenMiddleware, UserController.deleteUserAccount);
router.post("/save_delete_account_feedback",verifyTokenMiddleware, UserController.saveDeleteAccountFeedback);

module.exports = router