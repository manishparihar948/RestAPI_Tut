const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Get back all the posts
//router.get('/posts',(req,res) => {
router.get('/',async (req,res) => {

  // res.send('We are on post');
  // we need all the post
  try {
    const posts = await Post.find(); // msg to mongoose
    res.json(posts);
  } catch (e) {
    res.json({message: err});
  }
});

//router.get('/specific',(req,res) => {
//  res.send('We are on specific');
//});

// Submits the post
router.post('/', async (req,res) => {
  const post = new Post({
    title:req.body.title,
    description:req.body.description
  });
  //console.log(req.body);
  try{
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({message : err});
  }

  // make more cleaner
  //.then(data => {
  //  res.json(data);
  //})
  //.catch(err => {
  //  res.json({message: err});
  //})
});

// Specific posts
router.get('/:postId', async (req,res) => {
  //console.log(req.params.postId);
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (e) {
    res.json({message:err});
  }

});

// Delete Post
router.delete('/:postId', async (req,res) => {
  try {
    const removedPost = await Post.remove({_id : req.params.postId});
    res.json(removedPost);
  } catch (e) {
    res.json({message:err});
  }
});

// Update Post
router.patch('/:postId', async (req,res) => {
  try {
    const updatedPost = await Post.updateOne(
      {_id:req.params.postId},
      {$set:{title: req.body.title}}
    );
    res.json(updatedPost);
  } catch (e) {
    res.json({message:err});
  }
  });

module.exports = router;
