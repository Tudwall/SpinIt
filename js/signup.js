const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const showPassword = document.getElementById("show-password");
const showPasswordIcon = document.getElementById("show-password-icon");
const matchPassword = document.getElementById("match");
const submitBtn = document.getElementById("submit-button");

const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

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

const updateRequirements = (id, valid) => {
	const requirement = document.getElementById(id);

	if (valid) {
		requirement.classList.add("valid");
	} else {
		requirement.classList.remove("valid");
	}
};

const handleFormValidation = () => {
	const passwordValue = password.value;
	const confirmValue = confirmPassword.value;
	const emailValue = email.value;
	const usernameValue = username.value;

	if (
		passwordRegex.test(passwordValue) &&
		passwordValue == confirmValue &&
		emailRegex.test(emailValue) &&
		usernameValue.length > 2
	) {
		submitBtn.removeAttribute("disabled");
		return true;
	}

	submitBtn.setAttribute("disabled", true);
	return false;
};

username.addEventListener("input", (event) => {
	const value = event.target.value;

	updateRequirements("username-requirement", value.length > 2);
});

email.addEventListener("input", (event) => {
	const value = event.target.value;

	updateRequirements("email-requirement", emailRegex.test(value));
});

password.addEventListener("input", (event) => {
	const value = event.target.value.trim();

	updateRequirements("length", value.length >= 8);
	updateRequirements("lowercase", /[a-z]/.test(value));
	updateRequirements("uppercase", /[A-Z]/.test(value));
	updateRequirements("number", /\d/.test(value));
	updateRequirements("characters", /[#.?!@$%^&*-]/.test(value));
});

confirmPassword.addEventListener("blur", (event) => {
	comparePasswords(event.target.value);
});

confirmPassword.addEventListener("focus", () => {
	matchPassword.classList.add("hidden");
});

showPassword.addEventListener("click", () => {
	toggleShowPassword();
});

form.addEventListener("change", () => {
	handleFormValidation();
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const validForm = handleFormValidation();

	if (!validForm) {
		return false;
	}

	alert("form envoyé");
});
