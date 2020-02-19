
var fs = require('fs');
//var uuid = require('uuid-mongodb');
const mongo = require('mongodb');
var Guid = require('guid');
const uuidHelper = require('mongo-uuid-helper');

var data = fs.readFileSync('./files/base-poc.json');
var js = JSON.parse(data);	
console.log('Iniciando Leitura do arquivo!');

	js.base.forEach(element => {
		var guid = Guid.create();
		//const mUUID2 = uuid.from(guid.value);
		console.log(guid.value);
		const csUUID = uuidHelper.csuuidStringToBin(guid.value)
		//var GUID = new mongo.Binary(new Buffer(mUUID2.value,'base64'), 3)
		//console.log(mUUID2);
		element._id=csUUID;
		element.Title=element.Description
		insert(element);
	});
	
console.log('Iniciando a inserção dos documentos no mongo!');

function insert(strdata){
	const MongoClient = mongo.MongoClient;
	const url = 'mongodb://10.100.3.167:57017';
	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err) throw err;
		const db = client.db("AdminChatbot");
		let collection = db.collection('Intention');
		collection.insert(strdata).then(result => {
				}).catch((err) => {

					console.log(err);
				}).finally(() => {

			client.close();
		});
	});
}