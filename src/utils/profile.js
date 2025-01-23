const checkSessionStorage = (key) => {
	if (sessionStorage.getItem(key) == null) {
		const data = [];
		return data;
	} else {
		const data = JSON.parse(sessionStorage.getItem(key));
		return data;
	}
};

const usersAPICall = async (url) => {
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
	usersAPICall("https://jsonplaceholder.typicode.com/users");
	createProfile(0);
});

const getCollection = () => {
	return JSON.parse(localStorage.getItem("favorites"));
};

const createCollectionCard = () => {
	const collectionContainer = document.getElementById("collection-wrapper");
	collectionContainer.innerHTML = "";
	const collection = getCollection();
	collection.forEach((element) => {
		const card = document.createElement("div");
		card.classList.add("card");

		const imageEl = document.createElement("img");
		imageEl.classList.add("cover-art");
		if (element.thumb !== "") {
			imageEl.setAttribute("src", `${element.thumb}`);
		} else {
			imageEl.setAttribute("src", "assets/icons/Record.svg");
		}

		const infoEl = document.createElement("div");
		infoEl.classList.add("info");

		const artistEl = document.createElement("span");
		artistEl.classList.add("artist");
		artistEl.textContent = `${element.artist} - `;
		const albumEl = document.createElement("span");
		albumEl.classList.add("album");
		albumEl.textContent = `${element.title} - `;
		const dateEl = document.createElement("span");
		dateEl.classList.add("date");
		dateEl.textContent = element.year;

		card.appendChild(imageEl);
		infoEl.appendChild(artistEl);
		infoEl.appendChild(albumEl);
		infoEl.appendChild(dateEl);

		const actionsEl = document.createElement("div");
		actionsEl.classList.add("actions");
		const starsEl = document.createElement("div");
		starsEl.classList.add("stars");
		for (let i = 0; i < 5; i++) {
			const star = document.createElement("img");
			star.setAttribute("src", "assets/icons/Star-fill.svg");
			starsEl.appendChild(star);
		}
		actionsEl.appendChild(starsEl);

		const addEl = document.createElement("div");
		const remCollec = document.createElement("img");
		remCollec.setAttribute("src", "assets/icons/Remove.svg");
		remCollec.setAttribute("id", "remove-collection");
		remCollec.setAttribute("data-release-id", `${element.id}`);
		remCollec.classList.add("remove-collection");
		remCollec.addEventListener("click", (event) => {
			removeFavorite(event.target);
		});
		const addWish = document.createElement("img");
		addWish.setAttribute("src", "assets/icons/Heart-outline.svg");
		addWish.classList.add("add-wishlist");
		addEl.appendChild(remCollec);
		addEl.appendChild(addWish);
		actionsEl.appendChild(addEl);

		card.appendChild(infoEl);
		card.appendChild(actionsEl);
		collectionContainer.appendChild(card);
	});
};

window.addEventListener("DOMContentLoaded", () => {
	createCollectionCard();
});

const removeFavorite = (card) => {
	const cardId = card.getAttribute("data-release-id");

	const collection = JSON.parse(localStorage.getItem("favorites"));

	collection.forEach((element) => {
		if (element.id == cardId) {
			collection.splice(element, 1);
			localStorage.setItem("favorites", JSON.stringify(collection));
		}
	});
	createCollectionCard();
};
