import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import strings from '../../../localization/authorization';
import { EMAIL_REGEX } from '../../../utils/validation';
import alertStrings from '../../../localization/alert';
import { authApi } from '../../../utils/api';
import { SAVE_AUTH } from '../../../redux/auth/reducer';
import { ApiClient } from '../../../swaggerApi/src';
import {
  _colors,
  _dims,
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight
} from '../../../utils/constants';
import { _alert } from '../../../utils/alert';
import * as routes from '../../../navigators/defineRoutes';
import { _requestFB } from './facebook';
import Overlay from '../../common/Overlay';
import { _setupGoogleSignin, _signInGoogle, _signOutGoogle } from './google';
import { getConnectionInfo } from '../../../utils/checkNetInfo';

const logo = require('../../../assets/images/logo.png');
const background = require('../../../assets/images/Loading.png');
const facebook = require('../../../assets/socials/facebook.png');
const google = require('../../../assets/socials/google.png');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'admin@admin.com',
      password: '123',
      fetching: false,
      googleUser: null
    };
  }

  componentDidMount() {
    _setupGoogleSignin(user => this.setState({ googleUser: user }));
  }

  _signOut = () => {
    authApi.logout((error, data, response) => {
      if (error) {
        _alert(alertStrings.error, response.body.message);
      } else {
        ApiClient.instance.authentications.Bearer.apiKeyPrefix = '';
        ApiClient.instance.authentications.Bearer.apiKey = '';
      }
    });
  };

  _signIn = async () => {
    if (!EMAIL_REGEX.test(this.state.email)) {
      _alert(alertStrings.warning, alertStrings.emailInvalid, [
        {
          text: alertStrings.ok,
          onPress: () => this.email.focus()
        }
      ]);
    } else if (this.state.password.length < 1) {
      _alert(alertStrings.warning, alertStrings.passwordTooShort, [
        {
          text: alertStrings.ok,
          onPress: () => this.password.focus()
        }
      ]);
    } else {
      const login = () => {
        this.setState({ fetching: true });
        authApi.login(
          {
            email: this.state.email,
            password: this.state.password
          },
          (error, data, response) => {
            console.log(response, error.message, error.code);
            this.setState({ fetching: false });
            if (error) {
              _alert(alertStrings.error, response.body.message);
            } else {
              // add Authorization to header
              ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
              ApiClient.instance.authentications.Bearer.apiKey = data.token;
              this.props.dispatch({ type: SAVE_AUTH, payload: data.user });
              AsyncStorage.setItem('token', data.token);
            }
          }
        );
      };

      getConnectionInfo(login);
    }
  };

  _registerSocial = opts => {
    this.setState({ fetching: true });
    authApi.registerSocial(opts, (error, data, response) => {
      this.setState({ fetching: false });
      if (error) {
        _alert(alertStrings.error, response.body.message);
      } else {
        // add Authorization to header
        ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
        ApiClient.instance.authentications.Bearer.apiKey = data.token;
        this.props.dispatch({ type: SAVE_AUTH, payload: data.user });
        AsyncStorage.setItem('token', data.token);
      }
    });
  };

  _handleGoogle = () => {
    if (!this.state.googleUser) {
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
        this._registerSocial(opts);
      });
    } else {
      const user = this.state.googleUser;
      const opts = {
        body: {
          provider: 'google',
          provider_id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo
        }
      };
      this._registerSocial(opts);
    }
  };

  render() {
    const isFetching = this.state.fetching;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <Overlay visible={isFetching} />
        <Image style={styles.bg} resizeMode="cover" source={background} />
        <View style={styles.logoContainer}>
          <Image resizeMode="cover" source={logo} style={styles.logo} />
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
            {strings.sendRequest}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._signOut} style={styles.inputWrapper}>
          <Text style={[styles.input, styles.requestButtonText, { color: _colors.mainColor }]}>
            Logout
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
            onPress={() => _requestFB(opts => this._registerSocial(opts))}
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
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(Login);

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
    color: '#000',
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
    flex: 1
  }
});
