import React, {Component} from 'react';

class Navigation extends Component {
    render() {
        const {wrapper, title, linksWrapper, links} = style;
        return (
            <div style={wrapper}>
                <div style={title}>Recipes App</div>
                <div style={linksWrapper}>
                    <div style={links}>Home</div>
                    <div style={links}>Recipes</div>
                    <div style={links}>Features</div>
                    <div style={links}>Log out</div>
                </div>
            </div>
        );
    }
}

const style = {
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#01ABAA',
        height: '80px'
    },
    title: {
        fontSize: '1.8em',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        paddingLeft: '30px'
    },
    linksWrapper: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: '50px'
    },
    links: {
        fontSize: '0.9em',
        color: '#E8E8E8',
        fontWeight: 'lighter',
        padding: '12px',
        cursor: 'pointer'
    }
}

export default Navigation;
