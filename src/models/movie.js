const {Schema, model} = require('mongoose');

const movieSchema = new Schema({
	title: String,
	sinopsis: String,
	thumbnail: String,
	uploadedBy: String,
	uploadedAt: {type: Number, default: new Date()}
}, {versionKey: false});


module.exports = model('Movie', movieSchema);