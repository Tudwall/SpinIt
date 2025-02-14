import express from "express";
import ReleaseController from "../controllers/release.controller.js";

const router = express.Router();
const releaseController = new ReleaseController();

router.post("/:id", (req, res) => releaseController.createRelease(req, res));
router.get("/", (req, res) => releaseController.getReleases(req, res));
router.get("/:id", (req, res) => releaseController.getReleaseById(req, res));
router.put("/:id", (req, res) => releaseController.updateRelease(req, res));

export default router;
