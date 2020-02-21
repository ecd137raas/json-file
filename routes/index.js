var fs = require('fs');
var Guid = require('guid');
var uuidHelper = require('mongo-uuid-helper');

module.exports = function(application){

    application.get('/', function(req, res){
        res.render('index');
    });

    application.get('/json', function(req, res){
        
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
         
        res.redirect('/');
    });

    application.get('/txt', function(req, res){
        
        var data = fs.readFileSync('./');
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
         
        res.redirect('/');
    });

}