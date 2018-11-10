var express = require('express'),
    router = express.Router(),
    db = require('../models'), //importing all models from index file
    helpers = require('../helpers/todos');


router.route('/')
    .get(helpers.getAllTodos)
    .post(helpers.createTodo);

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo) 
    .delete(helpers.deleteTodo);

module.exports = router;
