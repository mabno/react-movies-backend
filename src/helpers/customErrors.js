class CustomError{
	constructor(status, type, message, details){
		this.status = status;
		this.type = type
		this.message = message;
		this.details = details;
	}
}

// List of custom API REST errors
module.exports = {
	'auth-001': new CustomError(401, 'auth-001', 'Without token', 'Send authorization header with the token'),
	'auth-002': new CustomError(401, 'auth-002', 'Invalid token', `Sended token isn't valid`),
	'auth-003': new CustomError(401, 'auth-003', 'Invalid username', `The sended username doesn't exist`),
	'auth-004': new CustomError(401, 'auth-004', 'Invalid password', `The sended password doesn't match with the username`),
	'auth-005': new CustomError(400, 'auth-005', 'Username already exists ', `The sended username is already in use`),
	'auth-006': new CustomError(400, 'auth-006', 'Signup failed', `The sended data isn't valid to create a new user`),
	'http-400': new CustomError(400, 'http-400', 'Invalid request', `The request isn't correct`),
	'http-404': new CustomError(404, 'http-404', 'Not found', 'Requested resource not found'),
	'http-500': new CustomError(500, 'http-500', 'Unknown internal server error', 'Unknown'),
}