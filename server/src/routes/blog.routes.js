const express = require("express");
const router = express.Router();
const BlogService = require("../controllers/blog.controller");
const verifyTokenMiddleware = require("../middleware/jwt");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post("/post_blog", upload.single('Image'), verifyTokenMiddleware, BlogService.addNewPost);
router.put("/edit_post", upload.single('Image'), verifyTokenMiddleware, BlogService.editPost);
router.get("/get_posts", verifyTokenMiddleware, BlogService.getPosts);
router.get("/get_posts_by_user", verifyTokenMiddleware, BlogService.getPostsByUser);
router.get("/get_post_id", verifyTokenMiddleware, BlogService.getPostById);
router.delete("/delete_post/:id", verifyTokenMiddleware, BlogService.deletePost);

module.exports = router
