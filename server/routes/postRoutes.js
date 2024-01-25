const express = require("express");
const { createPost, updatePost, getAllPosts, getSinglePost } = require("../controllers/postController.js");
const router = express.Router();

const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });


// create post
router.post("/post", uploadMiddleware.single('file'), createPost);

// edit post
router.put("/post", uploadMiddleware.single('file'), updatePost);

// all all posts
router.get("/post", getAllPosts);

// get single posts
router.get('/post/:id', getSinglePost);

module.exports = router;