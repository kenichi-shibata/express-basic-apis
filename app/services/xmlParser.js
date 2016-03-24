var categoryParser = require('./categoryParser');
var xml = require('xml2js');
var parser = new xml.Parser()
module.exports = function xmlParse(xml,callback){
	parser.parseString(xml,function(err,json){
		if(err) callback(err,null);
		else if(json){
			categoryParser(json,function(err,category){
				if(err) callback(err);
				else if(category){
					callback(null,category);
				}
				else{
					callback('something went wrong with this program',null);
				}
			})
		}
	});
}
