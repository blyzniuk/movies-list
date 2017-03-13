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
                        <TouchableHighlight key={movie.id} onPress={() => {
                            this.props.navigate({key: 'Detail', id: movie.id });}
                        }>
                            <View>
                                <Image source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}} style={styles.resultImage}/>
                                <Text style={styles.resultText}>{movie.original_title}</Text>
                            </View>
                        </TouchableHighlight>
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
        height: 30,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        padding: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 0.7,
        height: 30,
        paddingVertical: 0,
        paddingBottom: 5
    },
    searchButton: {
        flex: 0.3
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
        searchedMovies: state.searchedMovies
    }
}
export default connect(
    mapStateToProps
)(Home);
