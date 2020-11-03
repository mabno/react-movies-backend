try{
	require('dotenv').config();
}catch{
	// Production mode
}

const express = require('express');
const serverConfig = require('./server');
const {PORT} = process.env;

//Database connection
require('./database');

//Express Server configuration
const app = serverConfig(express());

app.listen(PORT, () => {
	console.log('API REST working in port', PORT);
});