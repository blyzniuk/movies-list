import React from 'react';

import {
    Button,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

const SearchBar = ({movieTitle, onChangeText, searchPressed, isConnected}) => (
    <View style={styles.searchSection}>
        <TextInput
            style={styles.searchInput}
            returnKeyType="search"
            placeholder="Movie title"
            onChangeText={onChangeText}
            value={movieTitle}
        />
        <Button
            onPress={searchPressed}
            disabled={!isConnected}
            title="Search"
        />
    </View>
);

const styles = StyleSheet.create({
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
    }
});

export default SearchBar;
