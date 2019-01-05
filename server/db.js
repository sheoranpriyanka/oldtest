var mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin123@ds153093.mlab.com:53093/techkopra12').then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);
