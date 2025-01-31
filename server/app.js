import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
	console.info(`server is running on ${PORT}`);
});
