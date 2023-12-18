const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN IN
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password)
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => res.status(200).json({ message: "Sign Up Successfull"}));
  } catch (error) {
    res.status(200).json({ message: "user already exists" });
  }
});


// 
router.post("/signin", async(req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});
    if(!user){
      res.status(200).json({ message: "Please sign up First"});
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordCorrect){
      res.status(200).json({ message: "Password Is Not Correct" });
    }
    const {password, ...others } = user._doc;
    res.status(200).json({ others });
  } catch (error) {
    res.status(200).json({ message: "user already exists" });
  }
})

module.exports = router;
