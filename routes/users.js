const express = require('express');
const router = express.Router();
const UserModel = require("../models/user_model")
const bcrypt = require('bcryptjs');

router.get("/signup", async (req, res, next) => {
  res.render("template", {
      locals: {
          title: "Sign Up",
          
      },
      partials: {
          partial: "partial-signup"
      }
  });
});


/* GET users listing. */
router.post('/signup', async function(req, res, next) {
  const {firstname, lastname, email} = req.body; 

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  console.log("Signup", req.body);
  const newUser = new UserModel(firstname, lastname, email, hash);
  const newUserInstance =  await newUser.signUp();

  

});


module.exports = router;

