import { createStore } from 'redux';
import { combineReducers } from 'redux';

const reducer = combineReducers({});
const store = createStore(reducer);
const persister = 'Free';

export { store, persister };
