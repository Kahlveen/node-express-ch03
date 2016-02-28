var express = require('express');
var app = express();

//Set up handlebars view engine
//defaultLayout set to main.handlebars. i.e. unless specified otherwise, default view will be main
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//Registers the given template engine(callback) "handlebars.engine" as 'handlebars'
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);

//Routes
//app.<VERB> - VERB here represents the HTTP methods, i.e. GET, POST etc
//This method takes in two parameters: a path(defines the route) and a function

//app.<VERB> also handles URL normalizing. i.e. /about?foo=bar also directs to about page

//Express's res defaults to status code of 200 OK
app.get('/',function(req,res){
  res.render('home'); //IMPT!! The name here must be exactly the same as the filename of the handlebars file in views dir
});

app.get('/about',function(req,res){
  res.render('about');
});


//Note that we are using app.use instead of app.get
//app.use is the method by which Express adds middleware
//custom 404 page
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

//custom 500 page
app.use(function(err,req,res,next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port')+'; Press Ctrl-C to quit');
});