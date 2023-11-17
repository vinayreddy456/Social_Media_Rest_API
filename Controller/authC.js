const User = require("../models/User");
const bcrypt = require("bcrypt");

const Register=async (req, res) => {
    const newUser = new User({
       username: req.body.username,
       email: req.body.email,
       password: req.body.password
 
    });
     try {
         //generate new Password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(req.body.password, salt);
         //set password to hashed
         newUser.password = hashedPassword;
         //save
         const user = await newUser.save();
         res.status(200).json(user);
     } catch (err) {
         res.status(500).json(err);
     }
 }

 const login=async ( req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email});
        !user && res.status(404).json("Wrong credentials!");
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");
      //  const { password, ...others } = user._doc;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports = {
    Register: Register,
    login: login
  };