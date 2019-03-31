import { applyMiddleware, createStore, compose } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers/rootReducer';

// const middleware = window.cordova ?
// 	compose(applyMiddleware(promise(), thunk)) :
// 	compose(applyMiddleware(promise(), thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore(reducer, compose(applyMiddleware(promise(), thunk)));
