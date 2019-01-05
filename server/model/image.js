var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

var Image = new Schema({
     path:{type:String}
});
module.exports = mongoose.model( 'Image', Image );
