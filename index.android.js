import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './app/reducers';
import {AppRegistry} from 'react-native';

import AppContainer from './app/containers/AppContainer';

const loggerMiddleware = createLogger({predicete: (getState, action) => __DEV__});

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
    return createStore (reducer, initialState, enhancer);
}

const store = configureStore({
    favoriteMovies: {},
    searchedMovies: []
});

const App = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);

AppRegistry.registerComponent('MoviesList', () => App);
