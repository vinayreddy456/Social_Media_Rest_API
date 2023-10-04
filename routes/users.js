const router = require("express").Router()
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        //if user want to update password
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                //console.log(req.body.password);

            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    else {
        return res.status(403).json("You can update only your account");
    }
});
router.get("/", (req, res) => {
    res.send("Hello World!");
});

//Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
}
  else {
    return res.status(403).json("You can delete only your account");
}
});

//Get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        //console.log(user);
        const { password, updatedAt, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err);
    }
});
//Follow a user
router.put("/follow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToFollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      
      if (!userToFollow.followers.includes(req.body.userId)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You are already following this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
});

//Unfollow a user
router.put("/unfollow/:id", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const userToUnfollow = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      
      if (userToUnfollow.followers.includes(req.body.userId)) {
        await userToUnfollow.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You are not following this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot unfollow yourself");
  }
});

module.exports = router;