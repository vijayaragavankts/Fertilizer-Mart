const mongoose = require("mongoose");
const passportLocal = require("passport-local-mongoose");
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	isadmin: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	cart: [
		{
			productName: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			quantity: {
				type: Number,
				default: 1,
			},
		},
	],
	total: {
		type: Number,
		default: 0,
	},
});
userSchema.plugin(passportLocal);
module.exports = user = mongoose.model("user", userSchema);
