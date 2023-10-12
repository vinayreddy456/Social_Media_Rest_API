const router = require("express").Router();
const {Register,login}=require('../Controller/authC');


//REgister
router.post("/register", Register);
//LOGIN
router.post("/login", login)

module.exports = router;