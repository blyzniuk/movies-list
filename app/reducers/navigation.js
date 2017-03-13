import * as types from '../actions/types';

import {NavigationExperimental} from 'react-native';
const {
    CardStack,
    StateUtils
} = NavigationExperimental;

const allTabs = [
    (lastRoute) => lastRoute || {key: 'home', index: 0},
    (lastRoute) => lastRoute || {key: 'favorite', index: 1}
];

export const tabs = (state = {key: 'home', index: 0, routes: allTabs}, action) => {
    switch(action.type) {
        case types.SET_TAB:
            return Object.assign({}, state, allTabs[action.index]());
    }
    return state;
};

export const navigationState = (state = {index: 0, routes: [{key: 'ApplicationTabs'}, {key: 'Detail'}]}, action) => {
    switch(action.type) {
        case types.NAVIGATION_FORWARD:
            return StateUtils.forward(state);
        case types.NAVIGATION_BACK:
            return StateUtils.back(state);
    }
    return state;
};

export const navigationParams = (state={}, action) => {
    switch(action.type) {
        case types.NAVIGATION_FORWARD:
            return action.state;
    }
    return state;
};