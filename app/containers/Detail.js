import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions';

import {
    Button,
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Vibration
} from 'react-native';
import MovieImage from '../components/MovieImage';

class Detail extends Component {
    addToFavorite = () => {
        this.props.addToFavorite(this.movie());
        Vibration.vibrate();
    };

    movie() {
        return this.props.searchedMovies.find(({id}) => id === this.props.navigationParams.id)
            || this.props.favoriteMovies[this.props.navigationParams.id]
            || null;
    }

    render() {
        const movie = this.movie();
        if (!movie) {
            return (
                <View>
                    <Text>Oops</Text>
                </View>
            );
        }
        return (
            <View>
                <TouchableHighlight
                    style={{paddingVertical: 20, backgroundColor: '#222'}}
                    onPress={() => {
                        this.props.navigateBack();
                    }}
                >
                    <Text style={{color: '#FFF'}}>
                        {'<'} Go Back
                    </Text>
                </TouchableHighlight>
                <View>
                    <MovieImage
                        posterPath={movie.poster_path}
                        isFavorite={this.props.tabsIndex === 1}
                        style={styles.resultImage}
                    />
                    <Text style={styles.resultText}>{movie.original_title}</Text>
                </View>
                <Button
                    onPress={this.addToFavorite}
                    title="Add to favorite"
                />
                <Text style={{fontSize: 21}}>{movie.overview}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    resultImage: {
        height: 350,
        width: '100%',
        resizeMode: 'contain'
    },
    resultText: {
        backgroundColor: '#000',
        color: '#fff',
        height: 20
    }
});

function mapStateToProps(state) {
    return {
        searchedMovies: state.searchedMovies,
        favoriteMovies: state.favoriteMovies,
        navigationParams: state.navigationParams,
        tabsIndex: state.tabs.index
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
