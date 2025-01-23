import User from "../models/User";

class UserService {
	getAllUsersService() {
		try {
			const users = User.find();
			if (users.length == 0) {
				throw new Error("Aucun utilisateur trouvé");
			} else {
				return users;
			}
		} catch (err) {
			console.error(err);
		}
	}
}

export default UserService;
