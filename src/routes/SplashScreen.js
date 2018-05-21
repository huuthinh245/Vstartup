import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import * as routes from '../navigators/defineRoutes';
import { _dims } from '../utils/constants';
import Overlay from '../components/common/Overlay';

const bg = require('../assets/images/bg.jpg');

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routes.mainWithModal })]
      });
      this.setState({ visible: false }, () => this.props.navigation.dispatch(resetAction));
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <Overlay visible={this.state.visible} />
        <Image
          source={bg}
          style={{
            width: _dims.screenWidth,
            height: _dims.screenHeight,
            resizeMode: 'stretch'
          }}
        />
      </View>
    );
  }
}
