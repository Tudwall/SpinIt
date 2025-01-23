import UserService from "../services/userService";

class UserController {
	async getAllUsers(req, res) {
		try {
			const users = await UserService.getAllUsersService();
			if (users) {
				res.status(200).json({
					users,
				});
			} else {
				res.status(404).json({
					message: `Aucun user trouvé`,
				});
			}
		} catch (err) {
			console.error(err);
			res.send(500).json({
				message: "server crashed",
			});
		}
	}
}

export default UserController;
