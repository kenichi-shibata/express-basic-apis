var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var catSchema = new Schema({
	name: String,
	age: Number
});

var config = require('config');
var databaseConfig = config.get('database');
var db = mongoose.createConnection(databaseConfig);
var Cat = db.model('Cat',catSchema);

module.exports = Cat;
