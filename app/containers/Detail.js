import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions';

import {
    Button,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    Vibration
} from 'react-native';

class Detail extends Component {
    addToFavorite = () => {
        this.props.addToFavorite(this.movie());
        Vibration.vibrate();
    };

    movie() {
        return this.props.searchedMovies.find(({id}) => id === this.props.navigationParams.id) || null;
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
                    <Image source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}} style={styles.resultImage} />
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
        searchedMovies: state.searchedMovies,
        navigationParams: state.navigationParams
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
