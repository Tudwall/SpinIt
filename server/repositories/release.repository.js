import pool from "../config/db.config.js";

class ReleaseRepository {
	constructor() {
		this.pool = pool();
	}

	async createRelease({ cover, title, artists, release_date, discogs_id }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const newRelease = await conn.query(
				"INSERT INTO Releases (cover, title, artists, release_date, discogs_id) VALUES (?,?,?,?,?) RETURNING *",
				[cover, title, artists, release_date, discogs_id]
			);
			return newRelease;
		} catch (err) {
			throw new Error(
				"Erreur lors de la création de la release: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getReleases() {
		let conn;
		try {
			conn = await this.pool.getConnection();
			return await conn.query("SELECT * FROM releases");
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération des releases: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getReleaseById(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const rows = await conn.query("SELECT * FROM releases WHERE id = ?", [
				id,
			]);
			return rows[0] || null;
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de la release: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async updateRelease(id, { cover, title, artists, release_date, discogs_id }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query(
				"UPDATE releases SET cover = ?, title = ?, artists = ?, release_date = ?, discogs_id = ? WHERE id = ?",
				[cover, title, artists, release_date, discogs_id, id]
			);
			if (result.affectedRows === 0) throw new Error("Release non trouvée");

			const updatedRelease = await conn.query(
				"SELECT * FROM releases WHERE id = ?",
				[id]
			);
			return updatedRelease;
		} catch (err) {
			throw new Error(
				"Erreur lors de la modification de la release: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async deleteRelease(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query("DELETE FROM releases WHERE id = ?", [
				id,
			]);
			if (result.affectedRows === 0) throw new Error("Release non trouvée");
			return { message: "Release supprimée avec succès" };
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de la release: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}
}

export default ReleaseRepository;
