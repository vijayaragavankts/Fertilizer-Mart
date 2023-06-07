var Product = require("../models/product");
var Admin = require("../models/admin");
var User = require("../models/user");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const product = require("../models/product");
const user = require("../models/user");

router.get("/create", (req, res) => {
	res.render("proform");
});
router.post("/create", async (req, res) => {
	try {
		const product = {
			name: req.body.name,
			price: req.body.price,
			packing: req.body.packing,
			description: req.body.description,
			category: req.body.category,
		};
		product.description = product.description.trim();
		if (req.body.specification) {
			var specifications = req.body.specification;
			product.specification = await specifications.split(",");
			product.specification = await product.specification.map((feature) => {
				return feature.trim();
			});
		}
		if (req.body.application) {
			var applications = req.body.application;
			product.application = await applications.split(",");
			product.application = await product.application.map((feature) => {
				return feature.trim();
			});
		}
		productnew = new Product(product);
		await productnew.save();
		res.send(productnew);
		// console.log(productnew);
	} catch (error) {
		console.log(error);
	}
});
router.get("/products", async (req, res) => {
	const product = await Product.find({});
	res.render("products", { products: product });
});
router.get("/fertilizer/:id/view", async (req, res) => {
	try {
		var id = mongoose.Types.ObjectId(req.params.id);
		const product = await Product.findById(id);
		console.log(product);
		res.render("fertilizer", { product: product });
	} catch (error) {
		console.log(error);
	}
});
router.get("/cart/:id/add", isLoggedin, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		const user = await User.findById(req.user.id);
		// const admin = new Admin();
		const productnew = {
			productName: product.name,
			price: product.price,
		};
		user.cart.push(productnew);
		user.total += productnew.price;
		user.save();
		console.log(user.cart);
		res.redirect("/products");
	} catch (error) {
		console.log(error);
	}
});
router.get("/Order", isLoggedin, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (user.cart.length <= 0) {
			res.redirect("/products");
		} else {
			const admin = await Admin.find({});
			const productnew = {
				username: req.user.name,
				phone: req.user.phone,
				address: req.user.address,
				total: req.user.total,
				products: [],
			};
			const arr = await user.cart.map((item) => {
				return {
					name: item.productName,
					price: item.price,
					quantity: item.quantity,
				};
			});
			productnew.products = arr;
			admin[0].orders.push(productnew);
			await admin[0].save();
			user.cart = [];
			user.total = 0;
			await user.save();
			console.log(productnew);
			res.render("confirm", {
				user: user,
				order: arr,
				total: productnew.total,
			});
			// res.redirect("/products");
		}
	} catch (error) {
		console.log(error);
	}
});
router.get("/cart", isLoggedin, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.render("cart", { cart: user.cart });
	} catch (error) {
		console.log(error);
	}
});
router.get(
	"/updateQuantity/:id/:quantity/get",
	isLoggedin,
	async (req, res) => {
		try {
			const user = await User.findById(req.user.id);
			var ind = await user.cart.map((item) => item.id).indexOf(req.params.id);
			user.cart[ind].quantity = req.params.quantity;
			user.total -= user.cart[ind].price;
			user.total += user.cart[ind].price * user.cart[ind].quantity;
			user.save();
			res.send(user.cart[ind]);
		} catch (error) {
			console.log(error);
		}
	}
);
router.get("/cart/:id/delete", isLoggedin, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		var ind = await user.cart.map((item) => item.id).indexOf(req.params.id);
		user.total -= user.cart[ind].price * user.cart[ind].quantity;
		user.cart.splice(ind, 1);
		await user.save();
		res.redirect("/cart");
	} catch (error) {
		console.log(error);
	}
});
router.get("/confirm", (req, res) => {
	try {
		res.render("confirm");
	} catch (error) {
		console.log(error);
	}
});
function isLoggedin(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
}
module.exports = router;
