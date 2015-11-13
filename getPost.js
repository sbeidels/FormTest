/*Sarah Beidelschies
  GET and POST requests using express-handlebars
  11/10/15
*/


var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1234);

/*For a get request,
   for each key in query, add the key/value pair to array
   create the object content
   set the .getRequest property to true
   set the .data property to the key/value array
   render page using handlebars
*/
app.get("/", function(req, res) {
	var NVPairs = [];
	for (var name in req.query) {
		NVPairs.push({"name":name,"value":req.query[name]});
	}
	var content = {};
	content.getRequest = true;
	content.postRequest = false;
	content.data = NVPairs;
	res.render("queryString", content);
});

/*for a post request
  for each key in query, add the key/value pair to array
   create the object content
   set the .postRequest property to true
   set the .data property to the key/value array
   for each key in body, add key/value pair to array
   set the .bodyData property to the body key/value array
   render page using handlebars
*/
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
	content.postRequest = true;
	content.getRequest = false;
	res.render("queryString", content);
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
  console.log('Express started on http://52.26.106.49:' + app.get('port') + '; press Ctrl-C to terminate.');
});