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
import MovieListItem from '../components/MovieListItem';

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
                                <MovieListItem
                                    key={movie.id}
                                    movie={movie}
                                    isFavorite
                                    onPress={() => this.props.navigate({key: 'Detail', id: movie.id })}
                                />
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
