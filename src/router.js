const { Router } = require('express');
const customErrors = require('./helpers/customErrors');

//Controllers
const moviesController = require('./controllers/movies');
const userController = require('./controllers/user');

//Middlewares 
const auth = require('./middlewares/auth');

module.exports = () => {
	const router = Router();

	// Movies CRUD
	router.route('/movies(/:id)?')
		.all(auth)
		.get(moviesController.get)
		.post(moviesController.post)
		.put(moviesController.put)
		.delete(moviesController.delete);


	// Auth system
	router.post('/signup', userController.signup);
	router.get('/login/:username/:password', userController.login);


	// Error 404
	router.use((req, res, next) => {
		next(customErrors['http-404']);
	})

	// Error Handler
	router.use((err, req, res, next) => {
		const error = err || customErrors['http-500'];

		res.status(error.status);
		res.json(error)
	});
	return router;
}