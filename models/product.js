const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	specification: {
		type: [String],
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	application: {
		type: [String],
	},
	packing: {
		type: String,
	},
});
module.exports = product = mongoose.model("product", productSchema);
