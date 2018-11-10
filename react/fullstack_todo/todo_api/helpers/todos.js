var db = require('../models');

exports.getAllTodos = function(req, res) {
    db.Todo.find()
    .then(function(foundTodos) {
        res.json(foundTodos);
    })
    .catch(function(err) {
        res.send(err);
    });
}

exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        res.json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.getTodo = function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
}

exports.updateTodo = function(req, res) {
    db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
    .then(function(updatedTodo) {
        res.json(updatedTodo);
    })
    .catch(function(err) {
        console.log(err);
    });
}

exports.deleteTodo = function(req, res) {
    db.Todo.remove({ _id: req.params.todoId})
    .then(function() {
        res.json({ message: 'Todo deleted' });
    })
    .catch(function(err) {
        res.send(err);
    });
}

module.exports = exports;
