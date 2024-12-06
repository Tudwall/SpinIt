const loginBtn = document.getElementById("login-btn");

function getLoginInfos() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const loginInfos = {
		email: email,
		password: password,
	};
	return loginInfos;
}

loginBtn.addEventListener("click", () => {
	console.log(getLoginInfos());
});
