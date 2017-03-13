import * as types from './types';
import Api from '../lib/api';
import {AsyncStorage} from 'react-native';

export function fetchMovies(titleQuery) {
    return (dispatch, getState) => {
        const params = [
            'api_key=7f2b680ddd566bbf47ce21a12d2daced',
            `query=${encodeURIComponent(titleQuery)}`,
            'language=en-US&page=1&include_adult=false'
        ].join('&');
        return Api.get(`/search/movie?${params}`)
            .then(resp => {
                console.log(resp);
                dispatch(setSearchedMovies({movies: resp}))
            })
            .catch(ex => {
                console.log('error');
                console.log(ex);
            })
    }
}

export function setSearchedMovies({movies}) {
    return {
        type: types.SET_SEARCHED_MOVIES,
        movies
    }
}

export function addToFavorite(movie) {
    return (dispatch, getState) => {
        return AsyncStorage.setItem(
            JSON.stringify(movie.id),
            JSON.stringify(movie)
        )
            .then(() => {
                dispatch({
                    type: types.ADD_TO_FAVORITE,
                    movie
                })
            })
    };
}

export function fetchFavoriteMovies() {
    return (dispatch, getState) =>
        AsyncStorage.getAllKeys()
            .then((keys) => AsyncStorage.multiGet(keys))
            .then((movies) => {
                const favoriteMovies = movies.reduce(
                    (favoriteMoviesAcc, pair) => Object.assign(favoriteMoviesAcc, {[pair[0]]: JSON.parse(pair[1])}),
                    {}
                );
                dispatch(setFavoriteMovies(favoriteMovies))
            });
}


export function setFavoriteMovies(favoriteMovies) {
    return {
        type: types.SET_FAVORITE_MOVIES,
        favoriteMovies
    }
}