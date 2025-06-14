import mariadb from "mariadb";

function pool() {
	return mariadb.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DATABASE,
		connectionLimit: 5,
	});
}

export default pool;
