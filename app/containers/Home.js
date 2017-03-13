import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import MovieListItem from '../components/MovieListItem';
import SearchBar from '../components/SearchBar';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieTitleInput: '',
            searching: false,
            initialPosition: 0
        };
    }

    onChangeText = (movieTitleInput) => {
        this.setState({movieTitleInput});
    };

    searchPressed = () => {
        this.setState({searching: true});
        this.props.fetchMovies(this.state.movieTitleInput)
            .then(() => this.setState({searching: false}));
    };

    render() {
        return (
            <View style={styles.scene}>
                <SearchBar
                    searchPressed={this.searchPressed}
                    onChangeText={this.onChangeText}
                    movieTitle={this.state.movieTitleInput}
                />
                <ScrollView style={styles.scrollSection}>
                    {!this.state.searching && this.props.searchedMovies.map((movie) => (
                        <MovieListItem
                            key={movie.id}
                            movie={movie}
                            onPress={() => this.props.navigate({key: 'Detail', id: movie.id })}
                        />
                    ))}
                    {this.state.searching && <Text>Searching...</Text>}
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
        searchedMovies: state.searchedMovies
    }
}
export default connect(
    mapStateToProps
)(Home);
