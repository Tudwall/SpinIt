const loginBtn = document.getElementById("login-btn");

function getLoginInfos() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	console.log(email, password);
}

loginBtn.addEventListener("click", () => {
	getLoginInfos();
});
