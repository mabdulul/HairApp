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



router.get("/login", async (req, res, next) => {
  res.render("template", {
      locals: {
          title: "Login",
          
      },
      partials: {
          partial: "partial-login"
      }
  });
});

router.post('/signup', async (req, res, next) => {
  const {firstname, lastname, email} = req.body; 

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new UserModel(firstname, lastname, email, hash);
  const addUser =  await user.signUp();

  

 if (addUser) {
  res.status(200).redirect("/users/login");
} else {
  res.status(500);
}


});

router.post('/login', async (req, res, next) => {
  const {email , password} = req.body; 
  console.log(req.body);

  const user = new UserModel(null, null, email, password)
  const response = await user.login();
  console.log(response);


  if(!!response.isValid){
    const {personid, firstname, lastname} = response ;
    req.session.is_logged_in = true;
    req.session.firstname = firstname;
    req.session.lastname = lastname; 
    req.session.user_id = personid;
    


    res.status(200).redirect("/")
  }else{
    res.sendStatus(401);
  }


});

module.exports = router;

