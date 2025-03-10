import UserService from "../services/user.service.js";
import argon2 from "argon2";
class UserController {
	constructor() {
		this.userService = new UserService();
	}

	async createUser(req, res) {
		const { pfp, name, bio, email, pwd } = req.body;
		try {
			const hashedPassword = await argon2.hash(pwd, {
				type: argon2.argon2d,
			});

			const newUser = await this.userService.createUser({
				pfp,
				name,
				bio,
				email,
				pwd: hashedPassword,
			});
			res.status(201).json(newUser);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async loginUser(req, res) {
		if (!req.body.email || !req.body.pwd) {
			res.json({ message: "email et mot de passe requis" });
		}
		const { email, pwd } = req.body;
		try {
			const userToken = await this.userService.loginUser({ email, pwd });
			if (!userToken) {
				throw new Error("Identifiants incorrects");
			} else {
				res.cookie("token", userToken, {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					sameSite: "Strict",
					expires: new Date(Date.now() + 3600000),
				});
				res.status(200).json({ message: "Connexion réussie" });
			}
		} catch (err) {
			res.status(401).json(err.message);
		}
	}

	async getUsers(req, res) {
		try {
			const users = await this.userService.getUsers();
			res.status(200).json({ users });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async getUserById(req, res) {
		const { id } = req.params;
		try {
			const user = await this.userService.getUserById(id);
			res.status(200).json({ user });
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async updateUser(req, res) {
		const { id } = req.params;
		const { pfp, name, bio, email, pwd } = req.body;
		try {
			const updatedUser = await this.userService.updateUser(id, {
				pfp,
				name,
				bio,
				email,
				pwd,
			});
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}

	async deleteUser(req, res) {
		const { id } = req.params;
		try {
			const result = await this.userService.deleteUser(id);
			res.status(200).json(result);
		} catch (err) {
			res.status(400).json({ err: err.message });
		}
	}
}

export default UserController;
