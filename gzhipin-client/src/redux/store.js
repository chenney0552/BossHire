import { createStore } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));