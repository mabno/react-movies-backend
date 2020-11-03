const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
	username: String,
	password: String
}, {versionKey: false});


userSchema.methods.encryptPassword = async function(){
	this.password = await bcrypt.hash(this.password, 12);
}

userSchema.methods.comparePassword = async function(plainPassword){
	return await bcrypt.compare(plainPassword, this.password);
}


module.exports = model('User', userSchema);