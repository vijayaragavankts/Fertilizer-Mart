const mongoose = require("mongoose");
// const config = require("config");

const connectDB = async () => {
	try {
		await mongoose.connect(
			"mongodb+srv://kalaiyarasi:kalaiyarasi41@cluster0.3gssq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			}
		);
		console.log("DB connected");
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
module.exports = connectDB;
