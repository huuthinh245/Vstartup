import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { connect } from 'react-redux';

import strings from '../../localization/authorization';
import { styles } from './login';
import Header from '../../navigators/headers/CommonHeader';
import headerStrings from '../../localization/header';
import { _dims } from '../../utils/constants';
import { EMAIL_REGEX } from '../../utils/validation';
import alertStrings from '../../localization/alert';
import Spin from '../common/Spinner';
import { forgotAction } from '../../redux/auth/actions';
import emitter from '../../emitter';

class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  _requestForgot = async () => {
    if (!EMAIL_REGEX.test(this.state.email)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emailInvalid
      });
      this.email.focus();
    } else {
      forgotAction({ email: this.state.email });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.wrapper}>
          <Header
            title={headerStrings.forgotScreen}
            modal
            onRightPress={() => this.props.navigation.goBack()}
            containerStyle={{
              borderBottomWidth: 0.5,
              borderColor: 'silver'
            }}
          />
          {this.props.auth.fetching && <Spin />}
          <View>
            <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
              <Ionicons name="ios-mail" style={styles.hoishiIcon} />
              <TextInput
                style={styles.hoishiInput}
                ref={email => {
                  this.email = email;
                }}
                placeholder={strings.email}
                onChangeText={email => this.setState({ email })}
                returnKeyType="go"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
              />
            </View>
            <TouchableOpacity style={styles.requestButton} onPress={this._requestForgot}>
              <Text style={styles.requestButtonText}>{strings.sendRequest}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(Forgot);
