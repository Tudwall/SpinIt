import UserRepository from "../repositories/user.repository.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async createUser({ id, pfp, name, bio, email, pwd }) {
		try {
			return await this.userRepository.createUser({
				id,
				pfp,
				name,
				bio,
				email,
				pwd,
			});
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async loginUser({ email, pwd }) {
		try {
			const user = await this.userRepository.getUserByEmail(email);
			if (!user || !(await argon2.verify(user.pwd, pwd))) {
				throw new Error("Identifiants incorrects");
			}
			const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});
			return token;
		} catch (err) {
			console.error(err);
		}
	}

	async getUsers() {
		try {
			return await this.userRepository.getUsers();
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getUserById(id) {
		try {
			return await this.userRepository.getUserById(id);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async updateUser(id, { pfp, name, bio, email, pwd }) {
		try {
			const updatedUser = await this.userRepository.updateUser(id, {
				pfp,
				name,
				bio,
				email,
				pwd,
			});
			if (!updatedUser) {
				throw new Error("Utilisateur introuvable");
			}
			return updatedUser;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async deleteUser(id) {
		try {
			const deletedUser = await this.userRepository.deleteUser(id);
			if (!deletedUser) {
				throw new Error("Utilisateur introuvable");
			}
			return { message: "Utilisateur supprimé" };
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default UserService;
