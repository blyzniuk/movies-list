import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';

class Favorite extends Component {
        componentDidMount() {
        this.props.fetchFavoriteMovies();
    }

    render() {
        return (
            <View style={styles.scene}>
                <Text>Favorite</Text>
                <ScrollView style={styles.scrollSection}>
                    {
                        Object.keys(this.props.favoriteMovies).map((key) => {
                            const movie = this.props.favoriteMovies[key];

                            return (
                                <TouchableHighlight key={movie.id} onPress={() => {
                                    this.props.navigate({key: 'Detail', id: movie.id });}
                                }>
                                    <View>
                                        <Image source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}} style={styles.resultImage}/>
                                        <Text style={styles.resultText}>{movie.original_title}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    scene: {
        flex: 1,
        marginTop: 5
    },
    scrollSection: {
        flex: 0.8
    },
    resultImage: {
        height: 150
    },
    resultText: {
        backgroundColor: '#000',
        color: '#fff',
        height: 20
    }
});

function mapStateToProps(state) {
    return {
        favoriteMovies: state.favoriteMovies
    }
}
export default connect(
    mapStateToProps
)(Favorite);
