import React, {Component} from 'react';

class ActivitiesList extends Component {
    render() {
        const activities = ['Surfing', 'Snorkeling', 'Relaxing'];
        return (
            <ul>
                {activities.map((val, i) => <li key={i} style={style.liStyle}>{val}</li>)}
            </ul>
        );
    }
}

const style = {
    h5Style: {
        fontSize: '2em',
        margin: '2px'
    },
    liStyle: {
        fontSize: '1.5em'
    }
};

export default ActivitiesList;
