const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./router');
const cors = require('./middlewares/cors');

module.exports = app => {
	//Middlewares
	app.use(cors);
	app.use(morgan('dev'));
	app.use(bodyParser.json());

	//Routes
	app.use(routes());

	return app;
}