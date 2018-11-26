import React from 'react';
import { View, Image, StatusBar, AsyncStorage, Text, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';

import * as routes from './routes';
import { _dims, responsiveWidth } from '../utils/constants';
import Overlay from '../components/common/Overlay';
import {
  getListCityAction,
  getListOptionsAction,
  setListCityAction,
  setListOptionsAction
} from '../redux/preload/actions';
import { loginAction, getMeAction, SET_TOKEN } from '../redux/auth/actions';
import strings from '../localization/authorization';
import { ApiClient } from '../swaggerApi/src';

const bg = require('../assets/images/Loading.png');
const logo = require('../assets/images/logo.png');

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
      this.props.dispatch({ type: SET_TOKEN, payload: token });
      getMeAction();
    } else {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: routes.mainWithModal })
        ]
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
      <View style={styles.wrapper}>
        <StatusBar hidden />
        <Overlay visible />
        <Image
          source={bg}
          style={styles.background}
        />
        <Image 
          resizeMode="cover" 
          source={logo} 
          style={styles.logo} 
        />
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            position: 'absolute',
            bottom: 50
          }}
        >
          {strings.loadingData}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  options: state.options,
  city: state.city
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: _dims.screenWidth,
    height: _dims.screenHeight,
    resizeMode: 'stretch',
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default connect(mapStateToProps)(SplashScreen);
