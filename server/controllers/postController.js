const jwt = require("jsonwebtoken");
const fs = require('fs');
const Post = require('../models/postModel.js');
const createError = require("../utils/createError.js"); 


// create Post
const createPost = async (req, res , next) => {

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) {
        return createError("401" , "You are not authenticated");
      }

      const { title, summary, content } = req.body;

      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });


      return res.status(201).json(postDoc);
      
    });
  } catch (err) {
    next(err)
  }
};

//   Edit Post
const updatePost = async (req, res, next) => {

  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
     
      if (err) {
        return createError(401 , "You are not authenticated!")
      }

      const { id, title, summary, content } = req.body;

      const postDoc = await Post.findById(id);

      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      
      if (!isAuthor) {
        return createError(400 , "you are not the author")
      }
      
      const editedPost = await postDoc.update({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });

      return res.status(200).json(editedPost);

    });
  } catch (err) {
    next(err)
  }
};

//   get all posts
const getAllPosts = async (req, res, next) => {
  try {

    const allPosts = await Post.find().populate("author", ["username"]).sort({ createdAt: -1 }).limit(20);

    return res.status(200).json(allPosts);

  } catch (err) {
    next(err);
  }
};

//   get single posts
const getSinglePost = async (req, res, next) => {
  try {

    const { id } = req.params;

    const postDoc = await Post.findById(id).populate("author", ["username"]);

    return res.status(200).json(postDoc);

  } catch (err) {
    next(err);
  }
};

module.exports = { createPost, updatePost, getSinglePost, getAllPosts };
