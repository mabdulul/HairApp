var express = require("express");
const router = express.Router();
const HairModel = require("../models/hairForm_model");

/* GET home page. */
// router.get("/form", (req, res, next) => {
// 	res.render("template", {
// 		locals: {
// 			title: "",
// 			isLoggedIn: req.session.is_logged_in,
// 			UserName: req.session.firstname,
// 			UserId: req.session.user_id
// 		},
// 		partials: {
// 			partial: "partial-form"
// 		}
// 	});
// });

// router.post("/form", async (req, res) => {
// 	const {
// 		hairtype,
// 		length_hair,
// 		boxdye_salon,
// 		hair_structure,
// 		virgin_hair

// 	} = req.body;
// 	const forminstance = new HairModel(
// 		req.session.user_id,
// 		hairtype,
// 		length_hair,
// 		boxdye_salon,
// 		hair_structure,
// 		virgin_hair

// 	);
// 	const formIn = await forminstance.InsertFormData();
// 	console.log("The formIn", formIn);

// 	if (formIn.id < 0) {
// 		res.sendStatus(500);
// 	} else {
// 		res.redirect("/hair/form");
// 	}
// });

router.get("/form", (req, res, next) => {
	res.render("template", {
		locals: {
			title: "",
			isLoggedIn: req.session.is_logged_in,
			UserName: req.session.firstname,
			UserId: req.session.user_id
		},
		partials: {
			partial: "partial-form"
		}
	});
});

router.post("/form/hairtype", async (req, res) => {
	const { hairtype, user_id } = req.body;
	const forminstance = new HairModel(user_id, hairtype, null, null, null, null);
	const formIn = await forminstance.InsertHairType();
	console.log("The formIn", formIn);

	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});
router.post("/form/hairstructure", async (req, res) => {
	const { hairstructure, user_id } = req.body;
	const forminstance = new HairModel(
		user_id,
		null,
		hairstructure,
		null,
		null,
		null
	);
	const formIn = await forminstance.InsertHairStructure();
	console.log("The formIn", formIn);

	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});

router.post("/form/length_hair", async (req, res) => {
	const { length_hair, user_id } = req.body;
	const forminstance = new HairModel(
		user_id,
		null,
		null,
		length_hair,
		null,
		null
	);
	const formIn = await forminstance.InsertHairLength();
	console.log("The formIn", formIn);

	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});

router.post("/form/virgin_hair", async (req, res) => {
	const { virgin_hair, user_id } = req.body;
	const forminstance = new HairModel(
		user_id,
		null,
		null,
		null,
		virgin_hair,
		null
	);
	const formIn = await forminstance.Insertvirgin_hair();
	console.log("The formIn", formIn);

	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});

router.post("/form/dye", async (req, res) => {
	console.log(req.body);
	console.log();
	const {
		virgin_hair,
		boxdye_salon,
		colorOfhair,
		user_id,
		datecolor
	} = req.body;
	console.log(datecolor);
	const forminstance = new HairModel(
		user_id,
		null,
		null,
		null,
		virgin_hair,
		boxdye_salon,
		colorOfhair,
		null,
		datecolor

		// user_id,
		// null,
		// null,
		// null,
		// null,
		// virgin_hair,
		// boxdye_salon,
		// colorOfhair,
		// datecolor
	);
	const formIn = await forminstance.InsertHairdye();
	console.log("The formIn", formIn);

	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});

router.post("/form/hairroutine", async (req, res) => {
	const { hairroutine, user_id } = req.body;
	const forminstance = new HairModel(
		user_id,
		null,
		null,
		null,
		null,
		null,
		null,
		hairroutine
	);
	const formIn = await forminstance.Inserthairroutine();
	console.log("The formIn", formIn);

	if (formIn.id < 0) {
		res.sendStatus(500);
	} else {
		res.sendStatus(200);
	}
});

router.get("/form/hairprofile/:user_id", async function(req, res, next) {
	const { user_id } = req.params;
	console.log("user_id", user_id);

	//const forminstance = new HairModel(user_id);
	const postData = await HairModel.PullingHairQuizData(user_id);

	res.json(postData).status(200);
});

module.exports = router;
