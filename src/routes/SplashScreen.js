import React from 'react';
import { View, Image, StatusBar, AsyncStorage, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import * as routes from './routes';
import { _dims } from '../utils/constants';
import Overlay from '../components/common/Overlay';
import {
  getListCityAction,
  getListOptionsAction,
  setListCityAction,
  setListOptionsAction
} from '../redux/preload/actions';
import { loginAction, getMeAction } from '../redux/auth/actions';
import strings from '../localization/authorization';
import { ApiClient } from '../swaggerApi/src';

const bg = require('../assets/images/bg.jpg');

class SplashScreen extends React.Component {
  async componentDidMount() {
    // AsyncStorage.clear();
    // return;
    const resp = await AsyncStorage.multiGet(['token', 'options', 'city']);
    const token = resp[0][1];
    const options = resp[1][1];
    const city = resp[2][1];

    if (options) {
      setListOptionsAction(JSON.parse(options));
    }
    if (city) {
      setListCityAction(JSON.parse(city));
    }
    if (token) {
      ApiClient.instance.authentications.Bearer.type = 'apiKey';
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
      ApiClient.instance.authentications.Bearer.apiKey = token;
      loginAction({ email: 'mra@gmail.com', password: '123admin', reset: true });
      // getMeAction();
      // getListKeywordAction();
    } else {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routes.mainWithModal })]
      });
      const interval = setInterval(() => {
        const { city } = this.props.city.data;
        const { utils } = this.props.options.data;
        if (city && city[0] && utils[0]) {
          clearInterval(interval);
          this.props.dispatch(resetAction);
        }
      }, 200);
    }
    getListCityAction();
    getListOptionsAction();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        <Overlay visible />
        <Image
          source={bg}
          style={{
            width: _dims.screenWidth,
            height: _dims.screenHeight,
            resizeMode: 'stretch'
          }}
        />
        <Text style={{ color: '#fff', alignSelf: 'center', position: 'absolute', bottom: 50 }}>
          {strings.loadingData}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth, options: state.options, city: state.city });

export default connect(mapStateToProps)(SplashScreen);
