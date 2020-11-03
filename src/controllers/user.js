const ctrl = {};

const { User } = require('../models');
const jwt = require('jsonwebtoken');
const {PRIVATE_KEY} = process.env;
const customErrors = require('../helpers/customErrors');
const requestValidation = require('../helpers/requestValidation');

// REGISTER new user
ctrl.signup = async (req, res, next) => {
	// Request body and params validation
	if(!requestValidation(['username', 'password'], [], req.body, req.params)){
		return next(customErrors['http-400']);
	}

	const { username, password} = req.body;

	// Check if the username already exists
	const alreadyExists = await User.countDocuments({username});
	if(alreadyExists > 0){
		return next(customErrors['auth-005']);
	}

	// Create the user and encrypt password
	user = await new User({username, password});
	await user.encryptPassword();
	user.save();
	res.json({message: 'Registered successfully'});
}

// LOGIN
ctrl.login = async (req, res, next) => {
	// Request body and params validation
	if(!requestValidation([], ['username', 'password'], req.body, req.params)){
		return next(customErrors['http-400']);
	}

	const { username, password } = req.params;

	// Find the username in database
	const user = await User.findOne({username});
	if(!user){
		return next(customErrors['auth-003']);
	}

	// Compare the username password
	const comparation = await user.comparePassword(password);
	if(!comparation){
		next(customErrors['auth-004']);
	} else {
		// Create an authentication token
		let token = jwt.sign({username}, PRIVATE_KEY);
		res.json({username, token, id: user.id});
	}
}

module.exports = ctrl;