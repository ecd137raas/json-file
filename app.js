
var express = require('express');
var fs = require('fs');
var uuid = require('uuid');
const mongo = require('mongodb');

var app = express();


var data = fs.readFileSync('./files/synonyms.json');
var js = JSON.parse(data);
console.log('Iniciando Leitura do arquivo!');
for(var i=0; i< js.intent.length; i++){
	if(js.intent[i].definition!=null){
		js.intent[i]._id=uuid.v1();
		js.intent[i].name=js.intent[i].definition;	
	}
}

var strdata = JSON.stringify(js,null,2);

console.log('Iniciando alteração do arquivo!');
fs.writeFile('./files/synonyms.json', strdata, function (err) {
	if(err){
		console.log('Falha');	
	} else {
		console.log('Iniciando a inserção dos documentos no mongo!');
		
		const MongoClient = mongo.MongoClient;
		const ObjectID = mongo.ObjectID;
		const url = 'mongodb://localhost:27017';

		MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
		    if (err) throw err;
		    const db = client.db("ticket");
		    let collection = db.collection('synonyms');
		    dados = JSON.parse(strdata);
		    collection.insert(dados).then(result => {

		        console.log("Documentos inseridos no mongo!");
		    		}).catch((err) => {

		       		 console.log(err);
		    		}).finally(() => {

		      client.close();
		    });
		});
	}
	
}); 


