const router = require('express').Router();
const {createpost,updatepost,deletepost,getapost,likeapost,getallposts } =require('../Controller/postC');
//Create post
router.post("/", createpost);
//update post
router.put("/:id", updatepost);

//delete post
router.delete("/:id", deletepost);

//Get a post
router.get("/:id", getapost);

//like a post
router.put("/:id/like", likeapost);
//Get all posts of a user
router.get("/profile/:username", getallposts);

//Get timeline posts
/*router.get("/timeline/:userId", async (req, res) => {
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
});*/

module.exports = router;