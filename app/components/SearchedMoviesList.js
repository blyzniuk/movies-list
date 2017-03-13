import React from 'react';

import {
    StyleSheet,
    ScrollView,
    Text
} from 'react-native';
import MovieListItem from '../components/MovieListItem';

const SearchedMoviesList = ({searchedMovies, navigate}) => (
    <ScrollView style={styles.scrollSection}>
        {
            !searchedMovies.length
            ? <Text style={styles.serviceText}>You need to fill a movie title and press "Search" button to start</Text>
            : searchedMovies.map((movie) => (
                <MovieListItem
                    key={movie.id}
                    movie={movie}
                    onPress={() => navigate({key: 'Detail', id: movie.id })}
                />
            ))
        }
    </ScrollView>
);

const styles = StyleSheet.create({
    scrollSection: {
        flex: 0.8
    },
    serviceText: {
        margin: 10,
        textAlign: 'center',
        fontSize: 20
    }
});

export default SearchedMoviesList;
