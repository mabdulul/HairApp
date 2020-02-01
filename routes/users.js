const express = require("express");
const router = express.Router();
const UserModel = require("../models/user_model");
const bcrypt = require("bcryptjs");

router.get("/signup", async (req, res, next) => {
	res.render("template", {
		locals: {
			title: "Sign Up",
			isLoggedIn: req.session.is_logged_in,
			UserName: req.session.firstname
		},
		partials: {
			partial: "partial-signup"
		}
	});
});

router.get("/login", async (req, res, next) => {
	res.render("template", {
		locals: {
			title: "Login",
			isLoggedIn: req.session.is_logged_in,
			UserName: req.session.firstname
		},
		partials: {
			partial: "partial-login"
		}
	});
});

router.get("/logout", (req, res, next) => {
	req.session.destroy();
	res.status(200).redirect("/");
});

router.post("/signup", async (req, res, next) => {
	const { firstname, lastname, email } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(req.body.password, salt);

	const user = new UserModel(firstname, lastname, email, hash);
	const addUser = await user.signUp();

	if (addUser) {
		res.status(200).redirect("/users/login");
	} else {
		res.status(500);
	}
});

router.get("/signup/aftersignUp/:email", async (req, res, next) => {
	const { email } = req.params;
	console.log("email", email);
	const userInstance = new UserModel(null, null, email, null);
	const getId = await userInstance.aftersignUp(email);

	res.json(getId).status(200);
});

router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;

	const user = new UserModel(null, null, email, password);
	const response = await user.login();

	if (!!response.isValid) {
		const { personid, firstname, lastname } = response;
		req.session.cookie.is_logged_in = true;
		req.session.cookie.firstname = firstname;
		req.session.cookie.lastname = lastname;
		req.session.cookie.user_id = personid;

		res
			.json(response)
			.status(200)
			.end();
		console.log(req.session);
	} else {
		res.sendStatus(401);
	}
});

module.exports = router;
