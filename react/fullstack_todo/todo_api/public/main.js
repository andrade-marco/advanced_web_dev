$(document).ready(function() {
    $.getJSON('/api/todos').then(addTodos);

    $('#todoInput').keypress(function(event) {
        if (event.which === 13) createTodo();
    });

    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function(event) {
        updateTodo($(this));
    });
});

function addTodos(todos) {
    //Add to-dos to the page
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed) newTodo.addClass('done');

    $('.list').append(newTodo);
}

function createTodo() {
    //Send request to create new to-do
    var userInput = $('#todoInput').val();
    $.post('/api/todos', { name: userInput })
    .then(function(newTodo) {
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function updateTodo(todo) {
    var id = todo.data('id');
    var updateUrl = '/api/todos/' + id;
    var isDone = !todo.data('completed');
    var updateData = { completed: isDone };

    $.ajax({ method: 'PUT', url: updateUrl, data: updateData})
    .then(function(res) {
        todo.toggleClass('done');
        todo.data('completed', isDone);
    });
}

function removeTodo(todo) {
    var id = todo.data('id');
    var deleteUrl = '/api/todos/' + id;

    $.ajax({ method: 'DELETE', url: deleteUrl })
    .then(function(res) {
        todo.remove();
        console.log(res.message);
    });
}
