/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  user = require('./routes/user'),
  http = require('http'),
  path = require('path');
var fs = require('fs');
var events = require('events');
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
var mongoose = require('mongoose');
var dbPath = 'mongodb://localhost/nodebackbone';
var config = {
  mail: require('./config/mail')
};
var gridfs = require('./gridfs/gridfs')(mongoose);
// console.log(gridfs);
// var Account = require('./models/Account')(config, mongoose, nodemailer);
var app = express();
app.sessionStore = new MemoryStore();

app.server = http.createServer(app);

var models = {
  Account: require('./models/Account')(app, config, mongoose, nodemailer),
  WebModel: require('./models/WebModel')(app, config, mongoose, gridfs)
};


app.configure(function() {
  app.sessionSecret = 'SocialNet secret key';
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: app.sessionSecret,
    key: 'express.sid',
    store: app.sessionStore
  }));
  // mongoose.connect('mongodb://localhost/nodebackbone');
  mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) throw err;
  });
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.limit('1mb'));
});

// Create an event dispatcher
var eventDispatcher = new events.EventEmitter();
app.addEventListener = function(eventName, callback) {
  eventDispatcher.on(eventName, callback);
};
app.removeEventListener = function(eventName, callback) {
  eventDispatcher.removeListener(eventName, callback);
};
app.triggerEvent = function(eventName, eventOptions) {
  eventDispatcher.emit(eventName, eventOptions);
};

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.render('index.jade');
});
// app.get('/', routes.index);
// app.get('/users', user.list);

fs.readdirSync('routes').forEach(function(file) {
  if ( file[0] == '.' ) return;
  var routeName = file.substr(0, file.indexOf('.'));
  require('./routes/' + routeName)( app, models);
});


app.post('/data', function(req, res) {
  if(req.body.dataType == "model"){
    var options = { content_type: req.files.model.type };
    gridfs.putGridFileByPath(req.files.model.path,req.files.model.name,options,function(err, result){
      var modelId = result.fileId;
      var modelName = result.filename;
      var options = { content_type: req.files.texture.type };
      gridfs.putGridFileByPath(req.files.texture.path,req.files.texture.name,options,function(err, result){
        models.WebModel.uploadModel(req.session.accountId,result.fileId,modelId,req.body.dataTypes,modelName);
      });
    });

  }

  res.send(200);
});
// var models = models.WebModel.findAll(req.session.accountId,function(models_data){
//   console.log(models_data);
// });
app.get('/data/models',function(req, res){
  models.WebModel.findAll("517cfa42faa4dcf41500000a",function(models_data){
    res.send(models_data);
  });
});


app.post('/booth/generateBooth',function(req, res){
  // models.WebModel.generateBooth();
});

models.WebModel.generateBooth('517cfa42faa4dcf41500000a','aaa', -800,200,100);
models.WebModel.fethcAllBooths(function(doc){
  // res.send(doc);
  console.log(doc);
});

app.post('/generateBooth/:num', function(req, res) {
  var num = req.params.num;
  // console.log();
  var xps = req.body.xp;
  if(num > 0){
    for(var i=0;i<num;i++){
      models.WebModel.generateBooth(req.session.accountId,req.session.username, xps[i],200,100);
    }
  }
  // console.log(message);
});

app.get('/fethcAllBooths',function(req, res){
  models.WebModel.fethcAllBooths(function(doc){
    res.send(doc);
  });
});

app.get('/data/:id',function(req, res){

  if(req.session.loggedIn){
    gridfs.getGridFile(req.params.id,function(err, file){
      res.header("Content-Type", file.type);
      res.header("Content-Disposition", "attachment; filename="+file.filename);
      file.stream(true).pipe(res);
      // res.send(file);
    });
  }else {
    res.send("please log in.");
  }

});

app.post('/contacts/find', function(req, res) {
  var searchStr = req.param('searchStr', null);
  if (null == searchStr) {
    res.send(400);
    return;
  }
  models.Account.findByString(searchStr, function onSearchDone(err, accounts) {
    if (err || accounts.length == 0) {
      res.send(404);
    } else {
      res.send(accounts);
    }
  });
});

app.server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});