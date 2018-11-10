import React, { Component } from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            profileImageUrl: ''
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const authType = this.props.signup ? 'signup' : 'signin';
        this.props.onAuth(authType, this.state)
            .then(() => {
                this.props.history.push('/');
            })
            .catch(() => {
                return;
            })
    }

    showError = errors => {
        if (errors.message) {
            return (
                <div className="alert alert-danger">
                    {errors.message}
                </div>
            );
        }
    }

    isSignUpForm = signup => {
        const { username, profileImageUrl } = this.state;

        if (signup) {
            return (
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="form-control"
                        onChange={this.handleChange}
                        value={username}/>
                    <label htmlFor="image-url">Image URL</label>
                    <input
                        id="image-url"
                        name="profileImageUrl"
                        type="text"
                        className="form-control"
                        value={profileImageUrl}
                        onChange={this.handleChange}/>
                </div>
            );
        }
    }

    render() {
        const { email, username, password, profileImageUrl } = this.state;
        const { buttonText, heading, signup, errors, history, removeError } = this.props;

        //This listens for any change in the routes, and call the remove error to clear error message
        history.listen(() => removeError());

        return(
            <div className="row justify-content-md-center text-center">
                <div className="col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <h2>{heading}</h2>
                        {this.showError(errors)}
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            value={email}/>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={this.handleChange}/>
                        {this.isSignUpForm(signup)}
                        <button type="submit" className="btn btn-primary btn-block btn-lg">
                            {buttonText}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AuthForm;
