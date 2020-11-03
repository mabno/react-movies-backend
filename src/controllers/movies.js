const ctrl = {}

const { Movie } = require('../models');
const requestValidation = require('../helpers/requestValidation');
const customErrors = require('../helpers/customErrors');

// GET all movies
ctrl.get = async (req, res) => {
	const movies = await Movie.find({});
	res.json(movies);
}

// CREATE
ctrl.post = async (req, res, next) => {
	// Request body and params validation
	if(!requestValidation(['title', 'sinopsis', 'thumbnail', 'uploadedBy'], [], req.body, req.params)){
		return next(customErrors['http-400'])
	}

	const { title, sinopsis, thumbnail, uploadedBy} = req.body;

	// Create new movie
	try{
		await new Movie({title, sinopsis, thumbnail, uploadedBy}).save();
		res.json({message: 'Submited successfully'});
	}catch{
		next(customErrors['http-400'])
	}
}

// UPDATE
ctrl.put = async (req, res, next) => {
	// Request body and params validation
	if(!requestValidation(['title', 'sinopsis', 'thumbnail'], ['id'], req.body, req.params)){
		return next(customErrors['http-400'])
	}

	const { title, sinopsis, thumbnail } = req.body;
	const { id } = req.params;

	// Update specified movie
	try{
		await Movie.findByIdAndUpdate(id, {title, sinopsis, thumbnail});
		res.json({message: 'Updated successfully'});
	}catch{
		next(customErrors['http-400'])
	}
}

// DELETE
ctrl.delete = async (req, res, next) => {
	// Request body and params validation
	if(!requestValidation([], ['id'], req.body, req.params)){
		return next(customErrors['http-400'])
	}

	const { id } = req.params;

	// Delete specified movie
	try{
		await Movie.findByIdAndDelete(id);
		res.json({message: 'Deleted successfully'})
	}catch{
		next(customErrors['http-400'])
	}
}

module.exports = ctrl;
