import mongoose from "mongoose";

const mongooseConnect = async () => {
	console.log(process.env.DATABASE_URL);
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.info("mongoose is connected to database");
	} catch (err) {
		console.error(`mongoose connection issue ${err}`);
		process.exit();
	}
};

export default mongooseConnect;
