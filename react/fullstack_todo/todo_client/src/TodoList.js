import React, { Component } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const API_URL = '/api/todos/';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentWillMount() {
        this.loadTodos();
    }

    loadTodos = () => {
        fetch(API_URL)
        .then(res => this.handleResponse(res))
        .then(todos => this.setState({todos}));
    }

    addTodo = val => {
        fetch(API_URL, {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({name: val})
        })
        .then(res => this.handleResponse(res))
        .then(newTodo => this.setState({todos: [...this.state.todos, newTodo]}));
    }

    toggleTodo = todo => {
        const updateURL = API_URL + todo._id;
        fetch(updateURL, {
            method: 'PUT',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({completed: !todo.completed})
        })
        .then(res => this.handleResponse(res))
        .then(updatedTodo => {
            const todos = this.state.todos.map(todo => {
                if (todo._id === updatedTodo._id) {
                    return {...todo, completed: !todo.completed};
                } else {
                    return todo;
                }
            });

            this.setState({todos});
        });
    }

    deleteTodo = id => {
        const deleteURL = API_URL + id;
        fetch(deleteURL, {method: 'DELETE'})
        .then(res => this.handleResponse(res))
        .then(() => {
            const todos = this.state.todos.filter(todo => todo._id !== id);
            this.setState({todos});
        });
    }

    handleResponse = res => {
        if (!res.ok) {
            if (res.status >= 400 && res.status < 500) {
                return res.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                });
            } else {
                let err = { errorMessage: 'Server is not responding. Please try again later.' };
                throw err;
            }
        }

        return res.json();
    }

    render() {
        const todos = this.state.todos.map(todo => (
            <TodoItem
                key={todo._id} {...todo}
                onDelete={this.deleteTodo.bind(this, todo._id)}
                onToggle={this.toggleTodo.bind(this, todo)}/>
        ));

        return (
            <div>
                <h1>Todo list</h1>
                <TodoForm addTodo={this.addTodo}/>
                <ul>
                    {todos}
                </ul>
            </div>
        );
    }
}

export default TodoList;
