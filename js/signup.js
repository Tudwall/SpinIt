const form = document.querySelector("form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const showPassword = document.getElementById("show-password");
const showPasswordIcon = document.getElementById("show-password-icon");

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

showPassword.addEventListener("click", () => {
	toggleShowPassword();
});
