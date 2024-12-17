const checkSessionStorage = (key) => {
	if (sessionStorage.getItem(key) == null) {
		const data = [];
		return data;
	} else {
		const data = JSON.parse(sessionStorage.getItem(key));
		return data;
	}
};

const APICall = async (url) => {
	try {
		let response = await fetch(url);
		if (!response.ok) {
			throw new Error("Echec de la requête");
		}
		let dataJson = await response.json();
		const users = checkSessionStorage("users");
		users.push(...dataJson);
		sessionStorage.setItem("users", JSON.stringify(users));
		return dataJson;
	} catch (error) {
		console.error("Erreur de la récupération des données: " + error);
	}
};

const getUser = (id) => {
	const users = JSON.parse(sessionStorage.getItem("users"));
	return users[id];
};

const createProfile = (id) => {
	const user = getUser(id);

	const usernameEl = document.getElementById("username");
	usernameEl.textContent = user.username;
};

document.addEventListener("DOMContentLoaded", () => {
	APICall("https://jsonplaceholder.typicode.com/users");
	createProfile(0);
});
