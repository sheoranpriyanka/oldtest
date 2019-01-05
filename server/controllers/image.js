const Image = require('../model/image');


var Jimp = require('jimp');
 
// open a file called "lenna.png"
Jimp.read('1.png', (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(256, 256) // resize
    .quality(0) // set JPEG quality
    .greyscale() // set greyscale
    .write('lena-small-bw.png'); // save
});






module.exports.imageUpload = function(req, res) {
    if (!req.file) {
        
         return res.status(400).send({
            message:'Failed to Upload Image',
            success: false
         });
    
      } else {
         return res.status(200).send({
          message:'Uploaded!',  
          success: true,
          image:req.file
        });
      }
  };
  
  



//   const fs = require("fs");
// var zlib = require("zlib");
// const path = require('path');

// var filename = require("./a.txt");

// var compress = zlib.createGzip();
// var decompress = zlib.createGunzip();
// var readstream = fs.createReadStream(filename);

// function compressFile(filename) {
//  var newFileName = filename + ".gz",
//  writestream = fs.createWriteStream(newFileName);
//  readstream.pipe(compress).pipe(writestream);

// };
// function decompressFile(filename) {
//   var newFileName = filename.replace(".gz",""),
//  writestream = fs.createWriteStream(newFileName);
//  readstream.pipe(decompress).pipe(writestream);

// };

// if(/.gz$/i.test(filename)==true){
//   decompressFile(filename)
// }
// else{
//   compressFile(filename);

// }
