import pool from "../config/db.config.js";

class UserRepository {
	constructor() {
		this.pool = pool();
	}

	async createUser({ pfp, name, bio, email, pwd }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query(
				"INSERT INTO Users (pfp, name, bio, email, pwd) VALUES (?,?,?,?,?) RETURNING id, pfp, name, bio, email",
				[pfp, name, bio, email, pwd]
			);
			return result[0];
		} catch (err) {
			throw new Error(
				"Erreur lors de la création de l'utilisateur" + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getUsers() {
		let conn;
		try {
			conn = await this.pool.getConnection();
			return await conn.query("SELECT * FROM users");
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération des utilisateurs: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getUserById(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const rows = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
			return rows[0] || null;
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async getUserByEmail(email) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const rows = await conn.query("SELECT * FROM users WHERE email = ?", [
				email,
			]);
			return rows[0] || null;
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async updateUser(id, { pfp, name, bio, email, pwd }) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query(
				"UPDATE users SET pfp = ?, name = ?, bio = ?, email = ?, pwd = ? WHERE id = ?",
				[pfp, name, bio, email, pwd, id]
			);
			if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");

			const updatedUser = await conn.query("SELECT * FROM users WHERE id = ?", [
				id,
			]);
			return updatedUser;
		} catch (err) {
			throw new Error(
				"Erreur lors de la modification de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}

	async deleteUser(id) {
		let conn;
		try {
			conn = await this.pool.getConnection();
			const result = await conn.query("DELETE FROM users WHERE id = ?", [id]);
			if (result.affectedRows === 0) throw new Error("Utilisateur non trouvé");
			return { message: "Utilisateur supprimé avec succès" };
		} catch (err) {
			throw new Error(
				"Erreur lors de la récupération de l'utilisateur: " + err.message
			);
		} finally {
			if (conn) conn.release();
		}
	}
}

export default UserRepository;
