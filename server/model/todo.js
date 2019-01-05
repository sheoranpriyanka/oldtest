var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var Schema   = mongoose.Schema;

var Todo = new Schema({
    Id:{type:Number,unique: true},
    content:{type:String}
});
module.exports = mongoose.model( 'Todo', Todo );
