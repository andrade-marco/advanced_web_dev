import React, {Component} from 'react';
import Recipe from './recipe';

class RecipeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            random: 'Some text'
        };
    }

    static defaultProps = {
        recipes: [
            {
                title: 'Spaghetti',
                ingredients: ['Pasta', 'Tomato sauce', 'Ground beef'],
                instructions: 'Cook pasta until soft. Prepare ground beef in deep pan. Combine beef tomato sauce and pasta. Add salt and pepper, and serve.',
                img: 'spaghetti.jpg'
            },
            {
                title: 'Spaghetti',
                ingredients: ['Pasta', 'Tomato sauce', 'Ground beef'],
                instructions: 'Cook pasta until soft. Prepare ground beef in deep pan. Combine beef tomato sauce and pasta. Add salt and pepper, and serve.',
                img: 'spaghetti.jpg'
            },
            {
                title: 'Spaghetti',
                ingredients: ['Pasta', 'Tomato sauce', 'Ground beef'],
                instructions: 'Cook pasta until soft. Prepare ground beef in deep pan. Combine beef tomato sauce and pasta. Add salt and pepper, and serve.',
                img: 'spaghetti.jpg'
            }
        ]
    }

    render() {
        return (
            <div style={style.wrapper}>
                {this.props.recipes.map((r,i) => {
                    return <Recipe key={i} {...r}/>;
                })}
                <div>
                    {this.state.random}
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
        alignItems: 'center'
    }
}

export default RecipeList;
