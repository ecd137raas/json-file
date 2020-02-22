var fs = require('fs');
var Guid = require('guid');
var uuidHelper = require('mongo-uuid-helper');
const txtToJSON = require('txt-file-to-json');

module.exports = function(application){

    application.get('/', function(req, res){
        var msg = "";
        res.render('index', {msg: msg});
    });

    application.get('/json', function(req, res){
        var msg = "";
        var data = fs.readFileSync('./files/synonyms.json');
        var js = JSON.parse(data);	
            js.base.forEach(element => {
                var guid = Guid.create();
                const csUUID = uuidHelper.csuuidStringToBin(guid.value)
                element._id=csUUID;
                element.Title=element.Description
                insert(element);
            });
        
            function insert(strdata){
                var MongoClient = new application.config.db;
                MongoClient.connect(function(err, client) {
                    if (err) throw err;
                    const db = client.db("importfiles");
                    let collection = db.collection('synonyms');
                    collection.insert(strdata).then(result => {
                            }).catch((err) => {

                                console.log(err);
                            }).finally(() => {

                        client.close();
                    });
                });
            }
            msg = 'Operação finalizada';
         
        res.render('index', {msg: msg});
    });

    application.get('/txt', function(req, res){
        var msg = "";
        var dataInJSON  = txtToJSON( {filePath: "./files/words.txt", noOfRecords:2});
        //var data = fs.readFileSync('./files/words.txt', 'utf-8');
        console.log(dataInJSON);
        var js = JSON.parse(dataInJSON);
        console.log(js);
        
        function insert(strdata){
            var MongoClient = new application.config.db;
            MongoClient.connect(function(err, client) {
                if (err) throw err;
                const db = client.db("ticket");
                let collection = db.collection('synonyms');
                collection.insert(strdata).then(result => {
                        }).catch((err) => {

                            console.log(err);
                        }).finally(() => {

                    client.close();
                });
            });
        }
       
        res.render('index', {msg:msg});
    });

}