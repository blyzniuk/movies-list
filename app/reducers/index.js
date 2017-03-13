import {combineReducers} from 'redux';
import * as moviesReducer from './movies';
import * as navigationReducer from './navigation';

export default combineReducers(Object.assign(
    moviesReducer,
    navigationReducer
));
