const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
	oldOrders: [
		{
			username: {
				type: String,
				required: true,
			},
			phone: {
				type: Number,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			products: [
				{
					name: {
						type: String,
						required: true,
					},

					price: {
						type: Number,
						required: true,
					},
					quantity: {
						type: Number,
						required: true,
					},
				},
			],
			total: {
				type: Number,
				required: true,
			},

			date: {
				type: Date,
				default: Date.now(),
			},
		},
	],
	orders: [
		{
			username: {
				type: String,
				required: true,
			},
			phone: {
				type: Number,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			products: [
				{
					name: {
						type: String,
						required: true,
					},

					price: {
						type: Number,
						required: true,
					},
					quantity: {
						type: Number,
						required: true,
					},
				},
			],
			total: {
				type: Number,
				required: true,
			},

			date: {
				type: Date,
				default: Date.now(),
			},
		},
	],
});
module.exports = admin = mongoose.model("admin", adminSchema);
