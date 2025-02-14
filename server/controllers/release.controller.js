import ReleaseService from "../services/release.service.js";

class ReleaseController {
	constructor() {
		this.releaseService = new ReleaseService();
	}

	async createRelease(req, res, next) {
		const { id } = req.params;
		const { cover, title, artists, release_date, discogs_id } = req.body;
		try {
			const newRelease = await this.releaseService.createRelease({
				id,
				cover,
				title,
				artists,
				release_date,
				discogs_id,
			});
			res.status(201).json(newRelease);
		} catch (err) {
			res.status(400).json({ err: err.message });
			next(err);
		}
	}

	async getReleases(req, res) {
		try {
			const releases = await this.releaseService.getReleases();
			res.status(200).json({ releases });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async getReleaseById(req, res) {
		const { id } = req.params;
		try {
			const release = await this.releaseService.getReleaseById(id);
			res.status(200).json({ release });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async updateRelease(req, res) {
		const { id } = req.params;
		const { cover, title, artists, release_date, discogs_id } = req.body;
		try {
			const updatedRelease = await this.releaseService.updateRelease(id, {
				cover,
				title,
				artists,
				release_date,
				discogs_id,
			});
			res.status(200).json(updatedRelease);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async deleteRelease(req, res) {
		const { id } = req.params;
		try {
			const result = await this.releaseService.deleteRelease(id);
			res.status(200).json(result);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
}

export default ReleaseController;
