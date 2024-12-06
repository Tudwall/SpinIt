/* 
Objet retourné:
{
{
pagination:
    page: nb de pages demandées,
    pages: nb de pages total,
    per_page: nb d'éléments demandés par page,
    items: nb d'items au total  ,
    url: {
        last: lien de la dernière page,
        next: lien de la prochaine page
    }  
},
releases: [
    {
        id: id de l'item,
        status:,
        type: si c'est une release,
        format: nb de morceaux,
        label: label,
        title: titre de l'album,
        resource_url: lien vers l'album,
        role:,
        artist: nom de l'artiste,
        year: année de sortie,
        thumb: thumbnail?, 
        stats: [Object]
    }
]
}
*/

const APICall = async (url) => {
	let data = await fetch(url);
	let dataJson = await data.json();
	return dataJson.releases;
};

const getData = async (url) => {
	let jsonData = await APICall(url);
	return jsonData;
};

const createCard = async (url) => {
	const data = await getData(url);
	data.forEach((element) => {
		const card = document.createElement("div");
		card.classList.add("card");

		const imageEl = document.createElement("img");
		imageEl.classList.add("cover-art");
		imageEl.setAttribute("src", "assets/icons/Record.svg");

		const infoEl = document.createElement("div");
		infoEl.classList.add("info");

		const artistEl = document.createElement("span");
		artistEl.classList.add("artist");
		artistEl.textContent = element.artist;
		const albumEl = document.createElement("span");
		albumEl.classList.add("album");
		albumEl.textContent = element.title;
		const dateEl = document.createElement("span");
		dateEl.classList.add("date");
		dateEl.textContent = element.year;

		infoEl.appendChild(artistEl, albumEl, dateEl);

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
		addCollec.classList.add("add-collection");
		const addWish = document.createElement("img");
		addWish.setAttribute("src", "assets/icons/Heart-outline.svg");
		addWish.classList.add("add-wishlist");
		addEl.appendChild(addCollec, addWish);

		card.appendChild(infoEl, actionsEl);
		document.getElementById("card-container").appendChild(card);
	});
};

createCard("https://api.discogs.com/artists/1/releases?page=1&per_page=1");