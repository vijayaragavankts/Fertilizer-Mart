var User = require("../models/user");
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Login Route @ GET
router.get("/", async (req, res) => {
	res.render("home");
});
router.get("/about", async (req, res) => {
	res.render("about");
});

router.get("/login", async (req, res) => {
	res.render("login");
});
router.get("/contact", async (req, res) => {
	res.render("contact");
});
router.get("/edit/:id/profile", isLoggedin,async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.render("profile", { user: user });
	} catch (error) {
		console.log(error);
	}
});
router.post("/edit/:id/profile",isLoggedin, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		user.name = req.body.name;
		user.phone = req.body.phone;
		user.address = req.body.address;
		await user.save();
		res.redirect(`/edit/${user.id}/profile`);
	} catch (error) {
		console.log(error);
	}
});
// Login @ Post
router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

router.get("/signup", (req, res) => {
	res.render("signup");
});
// SignUp Route @ Post
router.post("/signup", async (req, res) => {
	user = {
		name: req.body.name,
		address: req.body.address,
		username: req.body.username,
		phone: req.body.phnno,
	};
	signUpUser(req, res, user, req.body.password);
});

// Logout Route @Post
router.get("/logout", function (req, res) {
	req.logOut();
	res.redirect("/");
});
function isLoggedin(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}
// Function for SignUp
const signUpUser = async (req, res, user, pwd) => {
	await User.register(new User(user), pwd, async function (err, userAuth) {
		if (err) {
			console.log(err);
			res.redirect("/signup");
			return;
		} else {
			await userAuth.save();
			passport.authenticate("local")(req, res, function () {
				res.redirect("/");
				return;
			});
		}
	});
};
module.exports = router;
