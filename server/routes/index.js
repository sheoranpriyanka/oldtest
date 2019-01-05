const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const Todos = require('../controllers/todo');
const User = require('../controllers/users');
const Image = require('../controllers/image')
var multer = require('multer');
var path = require('path');

const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

const storage = multer.diskStorage({
  destination: (__dirname + 'public'),
  filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + "_" + path.extname(file.originalname));
  }
});

var upload = multer({
  storage : storage,
  // limits  : 1000000,
  // fileFilter :function(req,file,cb){
  //   checkFileType(file,cb );
  // }
  
});
 
//  function checkFileType(file,cb){
//    const filetypes=/jpeg|png|gif|jpg/;
//    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
//    const mimetype = filetypes.test(file.mimetype );
//    if(mimetype && extname){
//        return cb(null,true);
//    }
//    else{
//     cb('Error: Images Only');
//   }
//  }

router.post('/login',User.login);
//router.post('/logout',User.logout);
router.post('/register',User.register);
router.delete('/delete/:_id',User.deleteUser);
router.get('/allusers',User.allUser);
router.post('/forgetPassword',User.forgetPassword);
router.post('/changePassword',User.changePassword);

router.post('/addTodo', Todos.todoAdd);
router.get('/allTodo',Todos.todoAll);
router.delete('/deleteTodo/:_id',Todos.removeTodo);
router.put('/updateTodo/:_id',Todos.updateTodo);
router.post('/search',Todos.searchTodo);
router.post('/image', upload.single("image"), Image.imageUpload)

// router.get('/search', (req,res)=>{
//   if(err){
//         res.status(400).send('Unable to Search')
//   }
//   else{
// 	res.find(req.body.content)
//  }
// });

module.exports = router;
