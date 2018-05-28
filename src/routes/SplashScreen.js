import React from 'react';
import { View, Image, StatusBar, AsyncStorage, Text } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import * as routes from '../navigators/defineRoutes';
import { _dims } from '../utils/constants';
import Overlay from '../components/common/Overlay';
import {
  getListCityAction,
  getListOptionsAction,
  setListCityAction,
  setListOptionsAction
} from '../redux/preload/actions';
import { loginAction } from '../redux/auth/actions';
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
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
      ApiClient.instance.authentications.Bearer.apiKey = token;
      loginAction({ email: 'admin@admin.com', password: '123' });
    }
    this.props.dispatch({ type: 'GET_LIST_OPTIONS' });
    getListCityAction();
    getListOptionsAction();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.fetching && nextProps.city.data.city && nextProps.options.data.utils[0]) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routes.mainWithModal })]
      });
      this.props.dispatch(resetAction);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />
        {/* <Overlay visible /> */}
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
