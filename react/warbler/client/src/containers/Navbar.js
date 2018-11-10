import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from "../images/warbler-logo.png";
import { logout } from '../store/actions/auth';

class Navbar extends Component {

    logout = event => {
        event.preventDefault();
        this.props.logout();
    }

    generateLinks = () => {
        const { user, isAuthenticated } = this.props.currentUser;

        if (isAuthenticated) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to={`/users/${user.id}/messages/new`}>New message</Link>
                    </li>
                    <li>
                        <a onClick={this.logout}>Sign out</a>
                    </li>
                </ul>
            );
        }

        return (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to='/signup'>Sign up</Link>
                </li>
                <li>
                    <Link to='/signin'>Sign in</Link>
                </li>
            </ul>
        );
    }

    render() {
        return (
            <nav className="navbar navbar-expand">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">
                            <img src={Logo} alt="Warbler Home" />
                        </Link>
                    </div>
                    {this.generateLinks()}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, { logout })(Navbar);
