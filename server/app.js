import express from "express";
import dotenv from "dotenv";
import mongooseConnect from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

mongooseConnect();

app.use(express.json());

app.listen(PORT, (req, res) => {
	console.info(`server is running on ${PORT}`);
});
