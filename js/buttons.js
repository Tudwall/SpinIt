const userIcon = document.getElementById("user-icon");

userIcon.addEventListener("click", () => {
	document.getElementById("user-dropdown").classList.toggle("show");
});

const notifIcon = document.getElementById("notification-icon");

notifIcon.addEventListener("click", () => {
	document.getElementById("notification-dropdown").classList.toggle("show");
});

window.addEventListener("click", (e) => {
	if (
		!e.target.matches("#user-icon") &&
		!e.target.matches("#notification-icon")
	) {
		let dropdowns = document.getElementsByClassName("dropdown-content");
		console.log(dropdowns);
		for (let i = 0; i < dropdowns.length; i++) {
			let openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
});
