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
		for (const dropdown of dropdowns) {
			if (dropdown.classList.contains("show")) {
				dropdown.classList.remove("show");
			}
		}
	}
});
