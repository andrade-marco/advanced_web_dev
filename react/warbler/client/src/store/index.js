import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//Configuring store - create store and add redux-thunk middleware
export function configureStore() {
    const store = createStore(rootReducer,
        compose(applyMiddleware(thunk))
    );

    return store;
}
