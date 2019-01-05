const Todo = require('../model/todo');
  // var todo = new Todo();

module.exports.todoAdd = function(req, res) {
  var todo = new Todo();
  todo.Id = req.body.id;
  todo.content = req.body.content;
  todo.save(function(err,data) {
    if(err) res.json(err);

    else {
      console.log('saved');
      res.json(data);}
  });
};

module.exports.todoAll=function(req, res, next){
Todo.find(function (err, todos) {
    if (err) {
      return next(new Error(err))
    }
    res.json(todos) // return all todos
  })
}

module.exports.removeTodo=function (req, res, next) {
  var id = req.params._id
  Todo.findByIdAndRemove(id, function (err, todo) {
    if (err) {
      return next(new Error('Todo was not found'))
    }
    res.json('Successfully removed')
  })
}

module.exports.updateTodo=function (req, res, next) {
  var _id = req.params._id
  Todo.findById(_id, function (err, todo) {
    if (err) {
      return next(new Error('Todo was not found'))
    } else {
      todo.id = req.body.id;
      todo.content = req.body.content;

      todo.save(
        function (err, todo) {
          if (err) {
            res.status(400).send('Unable to update todo')
          } else {
            console.log('update successfully')
            res.status(200).json(todo)
          }
        }
      )
    }
  })
}
module.exports.searchTodo=function (req, res, next){
  //
  //   var regex = new RegExp( req.body._id);  // 'i' makes it case insensitive
  //     return Todo.find({text: regex}, function(err,todo){
  //       if (err) {
  //         return next(new Error('Todo was not found'))
  //       }
  //       else{
  //         return res.send(todo);
  //       }
  // });



var search = req.body.type;
var query = req.body.query;
  Todo.find()
    .where(search)
    .equals(new RegExp(query, "i"))
    .exec(function (err, todo) {
    if (err) {
       res.status(500).json({ err });
    } else {
       res.status(200).json(todo);
    }
});

}
