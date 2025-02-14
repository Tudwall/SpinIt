import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();

class ReleaseRepository {
	constructor() {
		this.pool = mariadb.createPool({
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DATABASE,
			connectionLimit: 5,
		});
	}

	async createRelease({ id, cover, title, discogs_id, artists, release_date }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const newRelease = await conn.query(
				"INSERT INTO Releases (id, cover, title, artists, release_date, discogs_id) VALUES (?,?,?,?,?,?) RETURNING *",
				[id, cover, title, artists, release_date, discogs_id]
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
}

export default ReleaseRepository;
