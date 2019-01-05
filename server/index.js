var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var routesApi = require('./routes');
var multer = require('multer');
require('./db');
require('./passport');

app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use('/api', routesApi);
app.listen(4000, function () {
  console.log('Running on port 4000!')
}); 	 


//const yaml = require('js-yaml');
// const fs = require('fs');
// var precessImage = require('express-processimage');
// var morgan = require('morgan');

// app.use(morgan('dev'))
// app.use(precessImage('public'))