import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
	release_id: { type: Number, required: true },
	note: { type: Number, min: 0, max: 5, required: true },
	release: { type: mongoose.Schema.Types.ObjectId, ref: "Release" },
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
