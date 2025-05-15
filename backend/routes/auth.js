const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser")
var jwt = require("jsonwebtoken");
const JWT_SECRET = "thisisavery";

//Route-1 Create a User a Using: POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name"),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password characters length").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({success, errors: result.array() });
    }

    // CHECK WETHER THE USER WITH THIS EMAIL EXISTS ALREADY
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt); //[convert password into hash]
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      success = true
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
)
//Route-2 Authentication a User a Using: POST "/api/auth/login"
router.post(
  "/login",
[
  body("email", "Enter a valid email").isEmail(),
  body("password", "password not blank").exists()
],
async (req, res) => {
  let success = false;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
    const {email, password}= req.body;
 try{
  let user =await User.findOne({email})
  if(!user){
    success = false;

    return res.status(400).json({error:"Please try to login with correct credentials"})
  }
  const passwordCompare =await bcrypt.compare(password, user.password)
  if(!passwordCompare){
    success = false;
    return res.status(400).json({
     success, error:"Please try to login with correct credentails"})
  }

  const payload = {
    user:{
      id: user.id
    }
  }
  const authtoken = jwt.sign(payload, JWT_SECRET);
  success = true;
  res.json({ success,authtoken });

 }catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Some error occured");
}
}
);

//Route-3 Get login User Details Using: POST "/api/auth/getuser"
router.post(
  "/getuser", fetchuser, async (req, res) => {
 try{
 const userId = req.user.id
const user = await User.findById(userId).select("-password")
res.send(user)
 } catch (error) {
  console.error(error.message)
  res.status(500).send("Internal Some error occurred")
 }
})
module.exports = router;
