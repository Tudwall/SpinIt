import ReleaseRepository from "../repositories/release.repository.js";

class ReleaseService {
	constructor() {
		this.releaseRepository = new ReleaseRepository();
	}

	async createRelease({ id, cover, title, artists, release_date, discogs_id }) {
		try {
			return await this.releaseRepository.createRelease({
				id,
				cover,
				title,
				artists,
				release_date,
				discogs_id,
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getReleases() {
		try {
			return await this.releaseRepository.getReleases();
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getReleaseById(id) {
		try {
			return await this.releaseRepository.getReleaseById(id);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async updateRelease(id, { cover, title, artists, release_date, discogs_id }) {
		try {
			const updatedRelease = await this.releaseRepository.updateRelease(id, {
				cover,
				title,
				artists,
				release_date,
				discogs_id,
			});
			if (!updatedRelease) {
				throw new Error("Release non trouvée");
			}
			return updatedRelease;
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default ReleaseService;
