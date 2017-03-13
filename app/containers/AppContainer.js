import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions';

import ApplicationTabs from './ApplicationTabs';
import Detail from './Detail';

import {
    Animated,
    BackAndroid,
    StyleSheet,
    View,
    NavigationExperimental
} from 'react-native';

const {
    Card,
    Transitioner
} = NavigationExperimental;

const {PagerStyleInterpolator} = Card;

class AppContainer extends Component {
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.backPress);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.backPress);
    }

    backPress = () => {
        if (this.props.navigationState.index) {
            this.props.navigateBack();
            return true;
        }
        if (this.props.tabs.index) {
            this.props.setTab(0);
            return true;
        }
        return false;
    };

    _render = (transitionProps) => {
        const scenes = transitionProps.scenes.map((scene) => {
            const sceneProps = {
                ...transitionProps,
                scene
            };
            return this._renderScene(sceneProps);
        });
        return (
            <View style={{flex: 1}} >
                {scenes}
            </View>
        );
    };

    _renderScene = (sceneProps) => {
        return <SceneContainer {...sceneProps} {...this.props} key={sceneProps.scene.key} />
    };

    render() {
        return (
            <Transitioner
                navigationState={this.props.navigationState}
                render={this._render}
            />
        )
    }
}

class SceneContainer extends Component {
    render() {
        const style = [
            styles.scene,
            PagerStyleInterpolator.forHorizontal(this.props)
        ];

        let Scene = null;
        if (this.props.scene.route.key === 'ApplicationTabs') {
            Scene = ApplicationTabs;
        }
        if (this.props.scene.route.key === 'Detail') {
            Scene = Detail;
        }
        return (
            <Animated.View style={style}>
                <Scene {...this.props} style={this.style} />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    }
});

function mapStateToProps(state) {
    return {
        navigationState: state.navigationState,
        tabs: state.tabs
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
