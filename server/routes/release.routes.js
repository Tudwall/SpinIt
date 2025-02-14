import express from "express";
import ReleaseController from "../controllers/release.controller.js";

const router = express.Router();
const releaseController = new ReleaseController();

router.post("/:id", (req, res) => releaseController.createRelease(req, res));
router.get("/", (req, res) => releaseController.getReleases(req, res));

export default router;
