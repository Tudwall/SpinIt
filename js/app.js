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

fetch("https://api.discogs.com/artists/1/releases?page=1&per_page=1")
	.then((response) => {
		if (!response.ok) {
			throw new Error("connection failed");
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});
