class ArgumentRequiredException extends Error {
	constructor(status, message) {
		super(message);
		this.name = "ArgumentRequiredException";
		this.status = status;
	}
}

class ResourceNotFoundException extends Error {
	constructor(status, message) {
		super(message);
		this.name = "ResourceNotFound";
		this.status = status;
	}
}

class AlreadyExistsException extends Error {
	constructor(status, message) {
		super(message);
		this.name = "AlreadyExistsException";
		this.status = status;
	}
}

class UnauthorizedException extends Error {
	constructor(status, message) {
		super(message);
		this.name = "UnauthorizedException";
		this.status = status;
	}
}

export {
	ArgumentRequiredException,
	ResourceNotFoundException,
	AlreadyExistsException,
	UnauthorizedException,
};
