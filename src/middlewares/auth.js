const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = process.env;
const customErrors = require('../helpers/customErrors');

// Authentification to protected routes middleware
module.exports = (req, res, next) => {
 	const token = req.headers.authorization;

 	if(!token){
 		next(customErrors['auth-001']);
 	}

 	try{
 		// Verify if is a valid token
 		let auth = jwt.verify(token, PRIVATE_KEY);
 	}catch{
 		next(customErrors['auth-002']);
 	}

 	next();
}