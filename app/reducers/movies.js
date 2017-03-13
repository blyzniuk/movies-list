import * as types from '../actions/types';

export const searchedMovies = (state = [], action) => {
    switch(action.type) {
        case types.SET_SEARCHED_MOVIES:
            return [...action.movies];
    }
    return state;
};

export const moviesCount = (state = 0, action) => {
    switch(action.type) {
        case types.ADD_MOVIE:
            return state + 1;
        case types.SET_SEARCHED_MOVIES:
            return action.movies.length;
    }
    return state;
};

export const favoriteMovies = (state = {}, action) => {
    switch(action.type) {
        case types.ADD_TO_FAVORITE:
            return Object.assign({}, state, {[action.movie.id]: action.movie});
        case types.SET_FAVORITE_MOVIES:
            return Object.assign({}, action.favoriteMovies)
    }
    return state;
};
