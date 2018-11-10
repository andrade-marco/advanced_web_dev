import {ADD_TODO, REMOVE_TODO} from './actionCreators';

const INITIAL_STATE = {
    todos: [],
};

function randomSerial(length) {
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		result = "";
	for (var i = 0; i < length; i++) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}

	return result;
}

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, { task: action.task, id: randomSerial(6) }]
            };
        case REMOVE_TODO:
            let todos = state.todos.filter(val => val.id !== action.id);
            return { ...state, todos };
        default:
            return state;
    }
}

export default rootReducer;
