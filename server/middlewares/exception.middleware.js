import "dotenv/config";

const ErrorHandler = (err, req, res, next) => {
	console.error("Middleware d'erreur");
	const errStatus = err.statusCode || 500;
	const errMessage = err.message || "Quelque chose s'est mal passé";
	res.status(errStatus).json({
		success: false,
		status: errStatus,
		message: errMessage,
		stack: process.env.NODE_ENV === "dev" ? err.stack : {},
	});
};

export default ErrorHandler;
