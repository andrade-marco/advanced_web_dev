import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Homepage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import withAuth from '../hocs/withAuth';
import MessageForm from '../containers/MessageForm';

const Main = props => {
    const { authUser, errors, removeError, currentUser } = props;

    return (
        <div className="container">
            <Switch>
                <Route exact path='/' render={props => <Homepage {...props} currentUser={currentUser}/>}/>
                <Route exact path='/signin' render={ props => (
                        <AuthForm
                            {...props}
                            onAuth={authUser}
                            errors={errors}
                            removeError={removeError}
                            buttonText="Log in"
                            heading="Welcome back"/>
                    )}/>
                <Route exact path='/signup' render={ props => (
                        <AuthForm
                            {...props}
                            onAuth={authUser}
                            errors={errors}
                            removeError={removeError}
                            signup
                            buttonText="Sign me up!"
                            heading="Join Warbler today."/>
                    )}/>
                <Route path="/users/:id/messages/new" component={MessageForm} />
            </Switch>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
