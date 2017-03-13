import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';

import MovieListItem from '../components/MovieListItem';

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
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.searchInput}
                        returnKeyType="search"
                        placeholder="Movie title"
                        onChangeText={this.onChangeText}
                        value={this.state.movieTitleInput}
                    />
                    <Button
                        onPress={this.searchPressed}
                        title="Search"
                    />
                </View>
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
    searchSection: {
        height: 45,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 4,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 0.7,
        height: 40,
        paddingVertical: 0,
        paddingBottom: 5
    },
    searchButton: {
        flex: 0.3
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
