import React from 'react';

import {Image, View} from 'react-native';
import CachedImage from 'react-native-cached-image';

export function getImageSource(posterPath) {
    return posterPath
        ? {uri: `https://image.tmdb.org/t/p/w500/${posterPath}`}
        : require('../assets/placeholder-movie.png');
}

const MovieImage = ({posterPath, isFavorite, style}) => (
    <View style={{
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        {
            isFavorite
                ? <CachedImage
                    source={{uri: `https://image.tmdb.org/t/p/w500/${posterPath}`}}
                    defaultSource={require('../assets/placeholder-movie.png')}
                    style={style}
                />
                : <Image
                    source={getImageSource(posterPath)}
                    style={style}
                />
        }
    </View>
);


export default MovieImage;
