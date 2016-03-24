var config = require('config');
var request = require('superagent');
var qs = require('querystring');
var xmlParser = require('./../services/xmlParser');
var key = config.get('apikey');
var string,qstring;
var options = {
	api:'/api/images/get',
	key:key,
	format:'src'
};

function catRequester(req,res,option,callback){
	 string = 'http://thecatapi.com';
	if(option.key){
		string += option.api;
		string += '?'+'api_key='+option.key;
		string += '&'+'format=src';
	if(req.query.category)
		string += '&'+'category='+req.query.category;
	if(req.query.size)
		string += '&'+'size='+req.query.size;
		callback(null,string);
	}
	else
		callback('api key was not found',null);
}

function listRequester(req,res,callback){
	 string = 'http://thecatapi.com/api/categories/list';
	 request
	 .get(string)
	 .end(function(err,data){
		 if(err) callback(err,null);
		 else {
				xmlParser(data.text,function(err,json){
				if(err) callback(err,null);
				else{
					callback(null,json);
				}
			});
		}
	 });
}

function getNext(req,res,callback){
	qstring = qs.stringify(req.session.query);
	res.redirect('/cats/?'+qstring);
}

exports.clear = function clear(req,res){
	if(req.params.type==="size"){
		delete req.session.query.size;
		qstring = qs.stringify(req.session.query);
		res.redirect('/cats?'+qstring);
	}
	else if(req.params.type==="category"){
		delete req.session.query.category;
		qstring = qs.stringify(req.session.query);
		res.redirect('/cats?'+qstring);
	}
	else{
		res.send(req.params.type+' does not exists');
	}
};

exports.size = function size(req,res){
	req.session.query.size = req.params.size;
	qstring = qs.stringify(req.session.query);
	res.redirect('/cats/?'+qstring);
};

exports.category = function category(req,res){
	req.session.query.category = req.params.category;
	qstring = qs.stringify(req.session.query);
	res.redirect('/cats/?'+qstring)
};

exports.getCat = function getCat(req,res){
	catRequester(req,res,options,function(err,cats){
		if(err) res.send(err);
		else if(cats){
			req.session.query = req.query;
			res.render('cat',{cat:cats, category:req.query.category, size:req.query.size});
		}
		else{
			res.send('the cats are sick today!');
		}
	});
};

exports.getList = function getList(req,res){
 listRequester(req,res,function(err,list){
	 if(err) res.send(err);
	 else if(list){
		res.render('category',{list:list});
	 }
 });
};

module.exports.getNext = getNext; 
