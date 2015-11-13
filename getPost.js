var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1234);

app.get("/", function(req, res) {
	var NVPairs = [];
	for (var name in req.query) {
		NVPairs.push({"name":name,"value":req.query[name]});
	}
	var content = {};
	content.data = NVPairs;
	res.render("queryString", content);
});

app.post("/", function(req, res) {
	var NVPairs = [];
	
	for (var name in req.query) {
		NVPairs.push({"name":name,"value":req.query[name]});
		}
	var content = {};
	content.data = NVPairs;
	

	var NVPairsBody = [];
	for (var name in req.body) {
		NVPairsBody.push({"name":name,"value":req.body[name]});
	}
	
	content.bodyData = NVPairsBody;
	res.render("postRequest", content);
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});