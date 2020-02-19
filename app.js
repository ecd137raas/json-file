var fs = require('fs');
const mongo = require('mongodb');
var Guid = require('guid');
const uuidHelper = require('mongo-uuid-helper');

console.log('Iniciando Leitura do arquivo!');
var data = fs.readFileSync('./files/base3.json');
var js = JSON.parse(data);	
console.log('Adicionando os novos campos!');
	js.base.forEach(element => {
		var guid = Guid.create();
		const csUUID = uuidHelper.csuuidStringToBin(guid.value)
		element._id=csUUID;
		element.Title=element.Description
		insert(element);
	});
	
function insert(strdata){
	console.log('Iniciando a inserção dos documentos no mongo!');
	const MongoClient = mongo.MongoClient;
	//const url = ''
	const url = '';
	MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		if (err) throw err;
		const db = client.db("db");
		let collection = db.collection('collection');
		collection.insert(strdata).then(result => {
				}).catch((err) => {

					console.log(err);
				}).finally(() => {

			client.close();
		});
	});
}