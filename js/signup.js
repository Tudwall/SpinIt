const form = document.getElementById("form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const showPassword = document.getElementById("show-password");
const showPasswordIcon = document.getElementById("show-password-icon");
const matchPassword = document.getElementById("match");
const submitBtn = document.getElementById("submit-button");

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
	const value = password.value;
	const confirmValue = confirmPassword.value;

	if (
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) &&
		value == confirmValue
	) {
		submitBtn.removeAttribute("disabled");
		return true;
	}

	submitBtn.setAttribute("disabled", true);
	return false;
};

password.addEventListener("input", (event) => {
	const value = event.target.value;

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
