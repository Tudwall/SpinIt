const form = document.querySelector("form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const showPassword = document.getElementById("show-password");
const showPasswordIcon = document.getElementById("show-password-icon");
const matchPassword = document.getElementById("match");

const toggleShowPassword = () => {
	if (password.type == "password") {
		password.type = "text";
		confirmPassword.type = "text";
		showPasswordIcon.setAttribute("src", "assets/icons/Hide.svg");
		showPassword.setAttribute("aria-label", "Cacher le mot de passe");
		showPassword.setAttribute("aria-checked", "true");
	} else {
		password.type = "password";
		confirmPassword.type = "password";
		showPasswordIcon.setAttribute("src", "assets/icons/View.svg");
		showPassword.setAttribute("aria-label", "Afficher le mot de passe");
		showPassword.setAttribute("aria-checked", "true");
	}
};

const comparePasswords = (value) => {
	if (value.length && value != password.value) {
		matchPassword.classList.remove("hidden");
	} else {
		matchPassword.classList.add("hidden");
	}
};

confirmPassword.addEventListener("blur", (event) => {
	comparePasswords(event.target.value);
});

confirmPassword.addEventListener("focus", () => {
	matchPassword.classList.add("hidden");
});

showPassword.addEventListener("click", () => {
	toggleShowPassword();
});
