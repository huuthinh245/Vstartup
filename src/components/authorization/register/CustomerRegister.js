import React, { Component } from 'react';
import { View, TextInput, findNodeHandle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import emitter from '../../../emitter';
import strings from '../../../localization/authorization';
import { styles } from '../login';
import Spin from '../../common/Spinner';
import { EMAIL_REGEX } from '../../../utils/validation';
import alertStrings from '../../../localization/alert';
import { _dims } from '../../../utils/constants';
import { registerAction } from '../../../redux/auth/actions';

class CustomerRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    };
  }

  componentDidMount() {
    this.event = emitter.addListener('registerAccount', obj => {
      if (!obj.index || obj.index.i === 0) {
        const opts = {
          body: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role_id: 4
          }
        };
        const callback = () => registerAction(opts);
        this._validate(callback);
      }
    });
  }

  componentWillUnmount() {
    this.event.remove();
  }

  _validate = callback => {
    if (!this.state.name) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.nameEmpty
      });
      this.name.focus();
    } else if (!EMAIL_REGEX.test(this.state.email)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emailInvalid
      });
      this.email.focus();
    } else if (this.state.password.length < 6) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.passwordTooShort
      });
      this.password.focus();
    } else if (this.state.password !== this.state.rePassword) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.passwordNotTheSame
      });
      this.rePassword.focus();
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
        {this.props.auth.fetching && <Spin />}
        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="ios-contact" style={styles.hoishiIcon} />
          <TextInput
            ref={name => {
              this.name = name;
            }}
            style={styles.hoishiInput}
            placeholder={strings.name}
            onChangeText={name => this.setState({ name })}
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onFocus={event => {
              this.scroll.scrollToFocusedInput(findNodeHandle(event.target));
            }}
          />
        </View>

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
            onFocus={event => {
              this.scroll.scrollToFocusedInput(findNodeHandle(event.target));
            }}
          />
        </View>

        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="ios-lock" style={styles.hoishiIcon} />
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
            onFocus={event => {
              this.scroll.scrollToFocusedInput(findNodeHandle(event.target));
            }}
          />
        </View>

        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="ios-lock" style={styles.hoishiIcon} />
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
            onFocus={event => {
              this.scroll.scrollToFocusedInput(findNodeHandle(event.target));
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(CustomerRegister);
