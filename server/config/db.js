import mariadb from "mariadb";

const pool = mariadb.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	connectionLimit: 5,
});

(async function mariaConnect() {
	const conn = await mariadb.createConnection({
		host: "mydb.com",
		user: "myUser",
		password: "myPwd",
	});

	try {
		const res = await conn.query("select *");
		console.log(res);
		return res;
	} catch (err) {
		console.error(err);
	} finally {
		conn.end();
	}
})();
