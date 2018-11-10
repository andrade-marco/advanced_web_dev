import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { addTodo, removeTodo } from './actionCreators';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    handleAdd = val => {
        this.props.addTodo(val);
    }

    removeTodo = id => {
        this.props.removeTodo(id);
    }

    render () {
        let todos = this.props.todos.map((val, index) => (
            <Todo
                key={index}
                task={val.task}
                removeTodo={this.removeTodo.bind(this, val.id)}/>
        ));
        return (
            <Switch>
                <Route path='/todos/new' component={props => (
                        <NewTodoForm {...props} handleSubmit={this.handleAdd}/>
                    )}/>
                <Route exact path='/todos' component={() => <div>{todos}</div>}/>
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return { todos: state.todos };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(TodoList);
