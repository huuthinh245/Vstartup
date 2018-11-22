import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import strings from '../../../localization/authorization';
import { EMAIL_REGEX } from '../../../utils/validation';
import alertStrings from '../../../localization/alert';
import {
  _colors,
  _dims,
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight
} from '../../../utils/constants';
import * as routes from '../../../routes/routes';
import { _requestFB } from './facebook';
import Overlay from '../../common/Overlay';
import { _signInGoogle, _signOutGoogle } from './google';
import Header from '../../../navigators/headers/CommonHeader';
import headerStrings from '../../../localization/header';
import { loginAction, socialAction } from '../../../redux/auth/actions';
import emitter from '../../../emitter';

import { authApi } from '../../../utils/api';
import ApiClient from '../../../swaggerApi/src/ApiClient';

const logo = require('../../../assets/images/logo.png');
const background = require('../../../assets/images/Loading.png');
const facebook = require('../../../assets/socials/facebook.png');
const google = require('../../../assets/socials/google.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'agency02@gmail.com',
      password: '123admin',
      googleUser: null
    };
  }

  _signIn = async () => {
    if (this.props.auth.fetching) return;
    if (!EMAIL_REGEX.test(this.state.email)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emailInvalid
      });
      this.email.focus();
    } else if (this.state.password.length < 1) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.passwordTooShort
      });
      this.password.focus();
    } else {
      const callback = this.props.navigation.state.params
        ? () => this.props.navigation.goBack()
        : null;
      loginAction({
        email: this.state.email,
        password: this.state.password,
        callback
      });
    }
  };

  _handleGoogle = () => {
    const callback = () => {
      _signInGoogle(user => {
        this.setState({ googleUser: user });
        const opts = {
          body: {
            provider: 'google',
            provider_id: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo
          }
        };
        socialAction(opts);
      });
    };

    if (this.state.googleUser) {
      _signOutGoogle(callback);
    } else {
      callback();
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.wrapper}
        scrollEnabled={false}
      >
        {this.props.navigation.state.params && (
          <Header
            title={headerStrings.loginScreen}
            modal
            onRightPress={() => this.props.navigation.goBack()}
            containerStyle={{
              borderBottomWidth: 0.5,
              borderColor: 'silver'
            }}
          />
        )}
        <View style={{ flex: 1 }} behavior="padding" enabled>
          <Overlay visible={this.props.auth.fetching} />
          <Image style={styles.bg} resizeMode="cover" source={background} />
          <View style={styles.logoContainer}>
            {/* <Image resizeMode="cover" source={logo} style={styles.logo} /> */}
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={email => {
                this.email = email;
              }}
              value={this.state.email}
              placeholder={strings.email}
              onChangeText={email => this.setState({ email })}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={password => {
                this.password = password;
              }}
              value={this.state.password}
              placeholder={strings.password}
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity onPress={this._signIn} style={styles.inputWrapper}>
            <Text style={[styles.input, styles.requestButtonText, { color: _colors.mainColor }]}>
              {strings.login}
            </Text>
          </TouchableOpacity>

          <View style={styles.controlWrapper}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate(routes.forgot)}>
              <Text style={styles.controlText}>{strings.forgot}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate(routes.register)}>
              <Text style={styles.controlText}>{strings.register}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.controlWrapper, styles.center]}>
            <TouchableOpacity
              style={styles.social}
              onPress={() => _requestFB(opts => socialAction(opts))}
            >
              <Image source={facebook} style={styles.socialImage} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this._handleGoogle}
              style={[styles.social, styles.socialRight]}
            >
              <Image source={google} style={styles.socialImage} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(Login);

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  bg: {
    width: _dims.screenWidth,
    height: _dims.screenHeight,
    position: 'absolute',
    top: 0,
    left: 0
  },
  requestButton: {
    padding: responsiveHeight(3),
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: _colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(5)
  },
  requestButtonText: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  inputWrapper: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginHorizontal: responsiveWidth(5)
  },
  input: {
    fontSize: responsiveFontSize(_dims.defaultFontInput),
    borderRadius: responsiveFontSize(_dims.defaultFontInput) / 2 + 13,
    color: 'black',
    backgroundColor: '#eee',
    padding: 10,
    paddingHorizontal: 15,
    overflow: 'hidden'
  },
  controlWrapper: {
    marginHorizontal: responsiveWidth(5),
    marginVertical: responsiveHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  controlText: {
    color: 'gold',
    fontSize: responsiveFontSize(_dims.defaultFontTitle)
  },
  social: {
    alignSelf: 'flex-end',
    marginHorizontal: 10
  },
  socialImage: {
    width: responsiveHeight(12),
    height: responsiveHeight(12),
    borderRadius: responsiveHeight(12) / 2
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialRight: {
    alignSelf: 'flex-start'
  },
  viewPaddingHorizontal: {
    paddingHorizontal: _dims.defaultPadding
  },
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveWidth(30)
  },
  hoishiWrapper: {
    borderBottomWidth: 1,
    borderColor: _colors.mainColor,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: responsiveHeight(3)
  },
  hoishiIcon: {
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontSize + 7),
    alignSelf: 'center'
  },
  hoishiInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: _dims.defaultPadding,
    color: 'black'
  }
});
