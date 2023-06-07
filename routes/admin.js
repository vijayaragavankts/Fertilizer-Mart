var Product = require("../models/product");
var Admin = require("../models/admin");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const product = require("../models/product");

router.get("/admin", isadmin, async (req, res) => {
	try {
		const admin = await Admin.find({});
		res.render("admin", { orders: admin[0].orders });
	} catch (error) {
		console.log(error);
	}
});
router.get("/admin/:id/delete", isadmin, async (req, res) => {
	try {
		const admin = await Admin.find({});
		const ind = await admin[0].orders
			.map((item) => item.id)
			.indexOf(req.params.id);
		admin[0].oldOrders.unshift(admin[0].orders[ind]);
		admin[0].orders.splice(ind, 1);
		await admin[0].save();
		res.redirect("/admin");
	} catch (error) {
		console.log(error);
	}
});
router.get("/oldOrders", isadmin, async (req, res) => {
	try {
		const admin = await Admin.find({});
		res.render("oldorders", { orders: admin[0].oldOrders });
	} catch (error) {
		console.log(error);
	}
});
router.get("/edit/:id/product", isadmin, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.render("editProduct", { item: product });
	} catch (error) {
		console.log(error);
	}
});
router.post("/edit/:id/product", isadmin, async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		product.price = req.body.price;
		product.name = req.body.name;
		product.packing = req.body.packing;
		await product.save();
		res.redirect("/products");
	} catch (error) {
		console.log(error);
	}
});
function isadmin(req, res, next) {
	if (req.isAuthenticated() && req.user.isadmin) {
		return next();
	} else {
		res.redirect("/");
	}
}
module.exports = router;
