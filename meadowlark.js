var express = require('express');
var app = express();

//Set up handlebars view engine
//defaultLayout set to main.handlebars. i.e. unless specified otherwise, default view will be main
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

//Registers the given template engine(callback) "handlebars.engine" as 'handlebars'
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3000);

//Set up static middleware
app.use(express.static(__dirname + '/public'));

//Set up variables for dynamic views
var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs",
  "Do not fear what you don't know",
  "You will have a pleasant surprise",
  "Whenever possible, keep it simple"
];

//Routes
//app.<VERB> - VERB here represents the HTTP methods, i.e. GET, POST etc
//This method takes in two parameters: a path(defines the route) and a function
//app.<VERB> also handles URL normalizing. i.e. /about?foo=bar also directs to about page

//Express's res defaults to status code of 200 OK
app.get('/',function(req,res){
  //IMPT!! The name here must be exactly the same as the filename of the handlebars file in views dir
  //The root path is the "views" dir. If the handlebars file is placed in folder e.g. views/test
  //then it should be res.render('test/home') instead
  res.render('home');
});

app.get('/about',function(req,res){
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  //Pass in variables into the handlebars template like this!
  //Within the template, use {{fortune}}
  res.render('about', {fortune: randomFortune});
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