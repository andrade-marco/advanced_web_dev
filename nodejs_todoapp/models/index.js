var mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-app');

mongoose.Promise = Promise; //Allow database queries to be promises to avoid callbacks

module.exports.Todo = require('./todo');
