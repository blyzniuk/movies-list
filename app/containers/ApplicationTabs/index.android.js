import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, Text, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Home from '../Home';
import Favorite from '../Favorite';

class ApplicationTabs extends Component {
    renderScene = (component) => (
        <View style={{flex: 1}}>
            {React.createElement(component, this.props)}
        </View>
    );

    onPress = ({i}) => {
        this.props.setTab(i);
    };

    render() {
        return (
            <ScrollableTabView
                style={{flex: 1}}
                tabBarPosition="bottom"
                onChangeTab={this.onPress}
                page={this.props.tabs.index}
            >
                <ScrollView tabLabel="Home">
                    {this.renderScene(Home)}
                </ScrollView>
                <ScrollView tabLabel="Favorite">
                    {this.renderScene(Favorite)}
                </ScrollView>
            </ScrollableTabView>
        )
    }
}

function mapStateToProps(state) {
    return {
        tabs: state.tabs
    }
}

export default connect(mapStateToProps)(ApplicationTabs);
