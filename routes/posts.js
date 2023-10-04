const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
//Create post
router.post("/", async (req, res) => {
    const newPost = new Post({
        userId: req.body.userId,
        desc: req.body.desc,
    });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update post
router.put("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    else {
      res.status(403).json("You can update only your post");
    }
});

//delete post
router.delete("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted");
      }
      catch (err) {
        res.status(500).json(err);
      }
    }
    else {
      res.status(403).json("You can delete only your post");
    }
});

//Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//like a post
router.put("/:id/like", async (req, res) => {
    try{
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("Post has been liked");
    }
    else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("Post has been disliked");
    }
}
    catch(err){
        res.status(500).json(err);
    }

});

//Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;