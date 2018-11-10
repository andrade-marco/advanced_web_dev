import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    showErrors = () => {
        if (this.props.errors.message) {
            return (
                <div className="alert alert-danger">
                    {this.props.errors.message}
                </div>
            );
        }
    }

    handleNewMessage = event => {
        event.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({message: ''});
        this.props.history.push('/');
    }

    render() {
        return (
            <form onSubmit={this.handleNewMessage}>
                {this.showErrors()}
                <input
                    type="text"
                    className="form-control"
                    value={this.state.message}
                    onChange={event => this.setState({message: event.target.value})}/>
                <button type="submit" className="btn btn-success pull-right">
                    Add new message
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);
