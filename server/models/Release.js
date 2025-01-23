import mongoose from "mongoose";

const ReleaseSchema = new mongoose.Schema({
	cover: { type: String, required: true },
	title: { type: String, required: true },
	release_id: { type: String, required: true },
	artists: { type: String, required: true },
	release_date: { type: String, required: true },
	note: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
});

const Release = mongoose.model("Release", ReleaseSchema);

export default Release;
