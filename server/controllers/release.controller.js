import ReleaseService from "../services/release.service.js";

class ReleaseController {
	constructor() {
		this.releaseService = new ReleaseService();
	}

	async createRelease(req, res) {
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
		}
	}

	async getReleases(req, res) {
		try {
			const users = await this.releaseService.getReleases();
			res.status(200).json({ users });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
}

export default ReleaseController;
