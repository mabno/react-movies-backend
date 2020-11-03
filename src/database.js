const mongoose = require('mongoose');
const {MONGODB_URI} = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
	.catch((err) => console.log(err))
	.then(() => console.log('Database connected')); 