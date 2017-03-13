import React, {Component} from 'react';
import {connect} from 'react-redux';

import {
    NetInfo,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import SearchedMoviesList from '../components/SearchedMoviesList';
import SearchBar from '../components/SearchBar';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movieTitleInput: '',
            searching: false,
            initialPosition: 0,
            isConnected: false
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this._handleConnectionInfoChange);
        NetInfo.isConnected.fetch().done((isConnected) => this.setState({isConnected}));
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this._handleConnectionInfoChange);
    }

    _handleConnectionInfoChange = (isConnected) => {
        this.setState({isConnected,});
    };

    onChangeText = (movieTitleInput) => {
        this.setState({movieTitleInput});
    };

    searchPressed = () => {
        this.setState({searching: true});
        this.props.fetchMovies(this.state.movieTitleInput)
            .then(() => this.setState({searching: false}));
    };

    renderMainView = () => {
        if (!this.state.isConnected) {
            return (
                <View>
                    <Text style={styles.serviceText}>You are offline now</Text>
                    <Text style={styles.serviceText}>But yours favorite movies are available</Text>
                </View>
            );
        }

        if (this.state.isConnected && this.state.searching) {
            return <Text style={styles.serviceText}>Searching...</Text>
        }


        return (
            <SearchedMoviesList
                searchedMovies={this.props.searchedMovies}
                navigate={this.props.navigate}
            />
        )
    };

    render() {
        return (
            <View style={styles.scene}>
                <SearchBar
                    searchPressed={this.searchPressed}
                    onChangeText={this.onChangeText}
                    movieTitle={this.state.movieTitleInput}
                    isConnected={this.state.isConnected}
                />
                {this.renderMainView()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        marginTop: 5
    },
    serviceText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 20
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
