import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import emitter from '../../../emitter';
import strings from '../../../localization/authorization';
import { styles } from '../login';
import { EMAIL_REGEX } from '../../../utils/validation';
import alertStrings from '../../../localization/alert';
import _alert from '../../../utils/alert';
import { _dims, _colors } from '../../../utils/constants';

export default class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rePassword: ''
    };
  }

  componentDidMount() {
    this.event = emitter.addListener('registerAccount', index => {
      if (!index || index.i === 0) {
        const callback = () => alert('validate');
        this._validate(callback);
      }
    });
  }

  componentWillUnmount() {
    this.event.remove();
  }

  _validate = callback => {
    if (!EMAIL_REGEX.test(this.state.email)) {
      _alert(alertStrings.warning, alertStrings.emailInvalid, [
        {
          text: alertStrings.ok,
          onPress: () => this.email.focus()
        }
      ]);
    } else if (this.state.password.length < 6) {
      _alert(alertStrings.warning, alertStrings.passwordTooShort, [
        {
          text: alertStrings.ok,
          onPress: () => this.password.focus()
        }
      ]);
    } else if (this.state.password !== this.state.rePassword) {
      _alert(alertStrings.warning, alertStrings.passwordNotTheSame, [
        {
          text: alertStrings.ok,
          onPress: () => this.rePassword.focus()
        }
      ]);
    } else {
      callback();
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        enableOnAndroid
        ref={o => {
          this.scroll = o;
        }}
      >
        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="ios-mail" style={styles.hoishiIcon} />
          <TextInput
            ref={email => {
              this.email = email;
            }}
            style={styles.hoishiInput}
            placeholder={strings.email}
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
          />
        </View>

        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="ios-key" style={styles.hoishiIcon} />
          <TextInput
            ref={password => {
              this.password = password;
            }}
            value={this.state.password}
            style={styles.hoishiInput}
            placeholder={strings.password}
            onChangeText={password => this.setState({ password })}
            returnKeyType="next"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="ios-key" style={styles.hoishiIcon} />
          <TextInput
            ref={rePassword => {
              this.rePassword = rePassword;
            }}
            value={this.state.rePassword}
            style={styles.hoishiInput}
            placeholder={strings.rePassword}
            onChangeText={rePassword => this.setState({ rePassword })}
            returnKeyType="go"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
