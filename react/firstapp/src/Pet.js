import React, {Component} from 'react';
import ActivitiesList from './Activities.js';
import './Pet.css';

class Pet extends Component {
    render() {

        return (
            <div style={style.wrapper}>
                <div className="card">
                    <h2 className="name">Beach</h2>
                    <img src="https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350" alt="Beach"/>
                    <h5 style={style.h5Style}>Things to do:</h5>
                    <ActivitiesList />
                </div>
            </div>
        );
    }
}

const style = {
    wrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h5Style: {
        fontSize: '2em',
        margin: '2px'
    },
    liStyle: {
        fontSize: '1.5em'
    }
};

export default Pet;
