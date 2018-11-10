import React, { Component } from 'react';

class NewTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state.task);
        this.setState({ task: '' });
        this.props.history.push('/todos');
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='task'>Task</label>
                <input
                    id='task'
                    name='task'
                    type='text'
                    value={this.state.task}
                    onChange={this.handleChange}/>
                <button type='submit'>Add a todo</button>
            </form>
        )
    }
}

export default NewTodoForm;
