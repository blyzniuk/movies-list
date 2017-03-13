import React from 'react';

import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

const MovieListItem = ({movie, onPress}) => (
    <TouchableHighlight onPress={onPress}>
        <View>
            <Image
                source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
                style={styles.resultImage}
            />
            <Text style={styles.resultText}>{movie.original_title}</Text>
        </View>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    resultImage: {
        height: 150
    },
    resultText: {
        backgroundColor: '#000',
        color: '#fff',
        height: 20
    }
});

export default MovieListItem;
