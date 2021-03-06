var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var models = require('./server/models/model');




mongoose.connect('mongodb://127.0.0.1/tsApp');

var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Task = mongoose.model('Task');
var Comment = mongoose.model('Comment');
var TaskVersion = mongoose.model('TaskVersion');



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var port = process.env.PORT || 8080; // na kom portu slusa server


var tsEntryRouter = express.Router(); // koristimo express Router



app.use('/ts', express.static(__dirname + '/public'));

app.set('views', __dirname + '/public/views');


app.use(function(err, req, res, next) {
  var message = err.message;
  var error = err.error || err;
  var status = err.status || 500;

  res.status(status).json({
    message: message,
    error: error
  });
});

require('./server/routes/registerRoutes')(app);

app.listen(port);

console.log('Server radi na portu ' + port);


