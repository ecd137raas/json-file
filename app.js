var express = require('express');
var consign = require('consign');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

consign()
	.include('/routes')
	.then('config/db.js')
	.into(app);

/* parametrizar a porta de escuta */
app.listen(80, function(){
	console.log('Servidor online');
})

module.exports = app;