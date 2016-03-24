module.exports = function categoryParser(json,callback){
	if(json){
		json = json.response.data[0].categories[0].category
		var processedJSON = {};
		for(var i in json){
			processedJSON[i] = json[i].name;
		}
		callback(null,processedJSON);
	}
	else if(!json){
		callback('could not get json from xml parser',null)
	}
	else{
		callback('something went horribly wrong',null);
	}
};
