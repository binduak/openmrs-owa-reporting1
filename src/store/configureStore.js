import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import promise from 'redux-promise-middleware';

function configureStoreProd(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        thunk,
        thunk,
        promise()
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    let store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );
    return store;
}

function configureStoreDev(initialState) {
    const middlewares = [
        reduxImmutableStateInvariant(),
        thunk,
        thunk,
        promise()
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
        )
    );


    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;