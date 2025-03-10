import { ResourceNotFoundException } from "../errors/exceptions.js";
import ReleaseRepository from "../repositories/release.repository.js";

class ReleaseService {
	constructor() {
		this.releaseRepository = new ReleaseRepository();
	}

	async createRelease({ cover, title, artists, release_date, discogs_id }) {
		try {
			return await this.releaseRepository.createRelease({
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
			const releases = await this.releaseRepository.getReleases();
			if (!releases)
				throw new ResourceNotFoundException(404, "Releases not found");
		} catch (err) {
			throw new Error(err);
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

	async deleteRelease(id) {
		try {
			const deletedRelease = await this.releaseRepository.deleteRelease(id);
			if (!deletedRelease) {
				throw new Error("Release non trouvée");
			}
			return { message: "Release supprimée" };
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default ReleaseService;
