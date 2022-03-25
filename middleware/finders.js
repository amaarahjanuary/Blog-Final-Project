const User = require('../models/userModel')
const Post = require('../models/postModel');

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);

    if (!user) res.status(404).json({ message: "Could not find user" });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    res.user = user;
}

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (!post) {
    res.status(404).json({ message: "Cannot find the Post You are looking for" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}


module.exports = { getUser, getPost};