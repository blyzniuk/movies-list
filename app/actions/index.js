import * as MoviesActions from './movies';
import * as NavigationActions from './navigation';

export const ActionCreators = Object.assign(
    {},
    MoviesActions,
    NavigationActions
);
