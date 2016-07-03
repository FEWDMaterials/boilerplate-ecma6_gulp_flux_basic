var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    app = express();

app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({
    extended: true
})); 

app.get('/list', function( req, res ) {
    fs.readFile('list.json', 'utf8', function(err, data) {
        res.send( JSON.parse( data ) );
    });
});

app.post('/list', function( req, res ) {
    fs.writeFile('list.json', JSON.stringify( req.body ), function(err) {
        console.log(err);

        res.send({ complete: true });
    });
});

app.use('/', serveStatic( 'public', {'index': [ 'index.html' ]}))

// Run server
http.createServer(app).listen('9012', 'localhost', function(){
    console.log("Express server listening on port " + app.get('port'));
});
