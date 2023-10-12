const Post = require('../models/Post');
const User = require('../models/User');


const createpost=async (req, res) => {
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
}
/*const cre = async (req, res) => {
    const po = new Post({
        userId: req.body.userId,
        desc: req.body.desc,
    });
    try {
        const savedPost = await po.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
}*/
    
/*const update=async (req,res) =>{
    const v=await Post.findById(req.params.id);
    if(v.userId===req.body.userId){
        try{
            const updateOne=await Post.findByIdAndUpdate((req.params.id,{$set:req.body},{new:true}));
            res.status(200).json(updateOne);
        }
        catch(err){
            res.ststus(500).json(err);
        }
    }
}*/
const updatepost=async (req, res) => {
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
}
/*const d=async (req,res)=>{
    const d=await Post.findById(req.params.Id);
    if(d.userId=== req.body.userId){
        try{
            d.deleteOne(req.params.Id);
            res.status(200).json("success");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    
}*/
const deletepost=async (req, res) => {
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
}
const likeapost=async (req, res) => {
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

}
const getapost=async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }
const getallposts=async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    }
    catch (err) {
      res.status(500).json(err);
    }
  }
module.exports={
   createpost:createpost,
   updatepost:updatepost,
   deletepost:deletepost,
   likeapost:likeapost,
   getallposts:getallposts,
   getapost:getapost
}