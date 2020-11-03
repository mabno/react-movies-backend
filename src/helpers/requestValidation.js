// Validate body and params of a request
module.exports = (requiredBodyProperties, requiredParams, body, params) => {
	
	// Check if required body props exists in the request body
	for(let prop of requiredBodyProperties){
		if(!body.hasOwnProperty(prop) || !body[prop]){
			return false;
		}
	}

	// Check if required params exists in the request params
	for(let param of requiredParams){
		if(!params.hasOwnProperty(param) || !params[param]){
			return false;
		}
	}

	return true;
}

