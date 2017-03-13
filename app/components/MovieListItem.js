import React from 'react';

import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import MovieImage from './MovieImage';

const MovieListItem = ({movie, onPress, isFavorite}) => (
    <TouchableHighlight onPress={onPress}>
        <View>
            <MovieImage
                isFavorite={isFavorite}
                posterPath={movie.poster_path}
                style={styles.resultImage}
            />
            <Text style={styles.resultText}>{movie.original_title}</Text>
        </View>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    resultImage: {
        width: '100%',
        height: 150
    },
    resultText: {
        backgroundColor: '#000',
        color: '#fff',
        height: 20
    }
});

export default MovieListItem;
