import UserRepository from "../repositories/user.repository.js";

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
