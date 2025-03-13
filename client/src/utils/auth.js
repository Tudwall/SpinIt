async function signup(accountInfo) {
	await fetch("http://localhost:3000/users/register", {
		method: "POST",
		body: JSON.stringify(accountInfo),
        Access-Control-Allow-Origin: *
	});
}

export default signup;
