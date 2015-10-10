var TWILIO_SID = "ACfd0a9d7d8cb97f60d0f38a5286bafa90";
var TWILIO_TOKEN = "5128522a87188e11ea8c3ab04646538f";
var TWILIO_NUMBER = "+14093003092";
var twilio = require('twilio');
var twilioClient = new twilio.RestClient(TWILIO_SID, TWILIO_TOKEN);

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'us-cdbr-azure-west-c.cloudapp.net',
	user     : 'b32dcf19cc2caa',
	password : 'c874e8b8',
	database : 'party123'
});

connection.connect();

router.get('/', function(req, res){
	res.render('index');
});

router.post('/', function(req, res){
	var resp = new twilio.TwimlResponse();
 
    resp.message('done');
 
    //Render the TwiML document using "toString"
    res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    res.end(resp.toString());

	var obj = JSON.parse(JSON.stringify(req.body, null, 2));
	var query = "INSERT INTO songs (song_name) VALUES ('" + obj.Body + "')";

	connection.query(query, function(err, rows, fields){
	});
});

router.get('/get_songs', function(req, res){
	var query = "SELECT * FROM songs";
	connection.query(query, function(err, rows, fields){
		res.send({'results' : rows});

		// var dquery = "DELETE FROM songs";
		// connection.query(dquery, function(err, rows, fields){
		// });
	});
});

module.exports = router;
