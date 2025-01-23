import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	pfp: { type: String },
	name: { type: String, required: true },
	bio: { type: String },
	password: { type: String, required: true, select: false },
	col: { type: Array, required: true },
	wishlist: { type: Array, required: true },
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const User = mongoose.model("User", UserSchema);

export default User;
