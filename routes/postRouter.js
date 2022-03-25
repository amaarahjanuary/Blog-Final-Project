const express = require('express');
const Post = require('../models/postModel')
const router = express.Router();
const auth = require('../middleware/auth')
const { getPost } = require('../middleware/finders')

// Getting All posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).send(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Getting One
router.get('/:id', getPost, (req, res, next) => {
  res.send(res.post);
});

//Creating A Post
router.post('/', auth, async (req, res, next) => {
    const {title , category, img, text, description, author} = req.body
    const post = new Post({
        title,
        category,
        text,
        description,
        creator: req.user._id,
        img,
        author
    });
  try {
    const newPost = await post.save();
    console.log()
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

//Updating A Post
router.put('/:id', auth, getPost, async (req, res, next) => {
    if (req.user._id !== res.post.creator)
        res.status(400).json({ msg: "You are not that guy pal" })
    const {title, category, img, text, description, author} = req.body;
    if (title) { res.post.title = title };
    if (category) { res.post.category = category };
    if (img) { res.post.img = img };
    if (text) { res.post.text = text };
    if (description) { res.post.description = description };
    if (author) { res.post.author = author };
    try {
        const updatedPost = await res.post.save();
        res.status(201).json(updatedPost);
    } catch (err) {
        res.status(400).json({ msg: err.message });
  }
});

//Deleting One
router.delete('/:id', auth, getPost, async (req, res, next) => {
    if (req.user._id !== res.post.creator)
        res.status(400).json({ msg: "You are unable to delete the post." })
    try {
    await res.post.remove();
    res.json({ message: "Post Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;