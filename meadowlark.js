var express = require('express');
var app = express();

app.set('port',process.env.PORT || 3000);

//Routes
//app.<VERB> - VERB here represents the HTTP methods, i.e. GET, POST etc
//This method takes in two parameters: a path(defines the route) and a function

//app.<VERB> also handles URL normalizing. i.e. /about?foo=bar also directs to about page

//Express's res defaults to status code of 200 OK
app.get('/',function(req,res){
  res.type('text/plain');
  res.send("Meadowlark Travel");
});

app.get('/about',function(req,res){
  res.type('text/plain');
  res.send("About Meadowlark Travel");
});


//Note that we are using app.use instead of app.get
//custom 404 page
app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port')+'; Press Ctrl-C to quit');
});