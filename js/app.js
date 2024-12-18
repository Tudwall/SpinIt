/* 
Objet retourné:
{
  pagination: {
    page: 1,
    pages: 129,
    per_page: 1,
    items: 129,
    urls: {
      last: 'https://api.discogs.com/artists/1/releases?page=129&per_page=1',
      next: 'https://api.discogs.com/artists/1/releases?page=2&per_page=1'
    }
  },
  releases: [
    {
      id: 20209,
      status: 'Accepted',
      type: 'release',
      format: '10"',
      label: 'Svek',
      title: 'Kaos',
      resource_url: 'https://api.discogs.com/releases/20209',
      role: 'Main',
      artist: 'Stephan-G* & The Persuader',
      year: 1997,
      thumb: '',
      stats: [Object]
    }
  ]
}
*/

const newReleasesAPICall = async (url) => {
	try {
		let response = await fetch(url);
		if (!response.ok) {
			throw new Error("Echec de la requête newReleases");
		}
		let dataJson = await response.json();
		const newReleases = [];
		newReleases.push(...dataJson.releases);
		sessionStorage.setItem("newReleases", JSON.stringify(newReleases));
		return dataJson.releases;
	} catch (error) {
		console.error("Erreur lors de la récupération des données: " + error);
	}
};

const interestsAPICall = async (url) => {
	try {
		let response = await fetch(url);
		if (!response.ok) {
			throw new Error("Echec de la requête interest");
		}
		let dataJson = await response.json();
		const interests = [];
		interests.push(...dataJson.releases);
		sessionStorage.setItem("interests", JSON.stringify(interests));
		return dataJson.releases;
	} catch (error) {
		console.error("Erreur lors de la récupération des données: " + error);
	}
};

const createReleasesCard = async (url) => {
	const data = await newReleasesAPICall(url);
	data.forEach((element) => {
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
		const addCollec = document.createElement("img");
		addCollec.setAttribute("src", "assets/icons/Add.svg");
		addCollec.setAttribute("id", "add-collection");
		addCollec.setAttribute("data-release-id", `${element.id}`);
		addCollec.classList.add("add-collection");
		addCollec.addEventListener("click", (event) => {
			addFavorite(event.target);
		});
		const addWish = document.createElement("img");
		addWish.setAttribute("src", "assets/icons/Heart-outline.svg");
		addWish.classList.add("add-wishlist");
		addEl.appendChild(addCollec);
		addEl.appendChild(addWish);
		actionsEl.appendChild(addEl);

		const newReleases = document.getElementById("card-container-new");
		card.appendChild(infoEl);
		card.appendChild(actionsEl);
		newReleases.appendChild(card);
	});
};

const createInterestsCard = async (url) => {
	const data = await interestsAPICall(url);
	data.forEach((element) => {
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
		const addCollec = document.createElement("img");
		addCollec.setAttribute("src", "assets/icons/Add.svg");
		addCollec.setAttribute("id", "add-collection");
		addCollec.setAttribute("data-release-id", `${element.id}`);
		addCollec.classList.add("add-collection");
		addCollec.addEventListener("click", (event) => {
			addFavorite(event.target);
		});
		const addWish = document.createElement("img");
		addWish.setAttribute("src", "assets/icons/Heart-outline.svg");
		addWish.classList.add("add-wishlist");
		addEl.appendChild(addCollec);
		addEl.appendChild(addWish);
		actionsEl.appendChild(addEl);

		const interests = document.getElementById("card-container-interest");
		card.appendChild(infoEl);
		card.appendChild(actionsEl);
		interests.appendChild(card);
	});
};

createReleasesCard(
	"https://api.discogs.com/artists/30773/releases?page=1&per_page=14"
);

createInterestsCard(
	"https://api.discogs.com/artists/341539/releases?page=1&per_page=14"
);

const checkLocalStorage = (key) => {
	if (localStorage.getItem(key) == null) {
		const data = [];
		return data;
	} else {
		const data = JSON.parse(localStorage.getItem(key));
		return data;
	}
};

const addFavorite = (card) => {
	const cardId = card.getAttribute("data-release-id");

	const newReleases = JSON.parse(sessionStorage.getItem("newReleases"));
	const interests = JSON.parse(sessionStorage.getItem("interests"));

	const favorites = checkLocalStorage("favorites");

	newReleases.forEach((element) => {
		if (element.id == cardId) {
			favorites.push(element);
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}
	});

	interests.forEach((element) => {
		if (element.id == cardId) {
			favorites.push(element);
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}
	});
};
