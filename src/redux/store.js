import { applyMiddleware, createStore, compose } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import reducer from './reducers/rootReducer';

const middleware = compose(applyMiddleware(promise(), thunk));

export default createStore(reducer, middleware);
