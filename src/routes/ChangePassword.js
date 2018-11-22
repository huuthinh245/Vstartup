import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { responsiveFontSize, _dims, responsiveHeight, _colors } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import alertStrings from '../localization/alert';
import strings from '../localization/authorization';
import emitter from '../emitter';
import { updatePasswordAction } from '../redux/auth/actions';
import { _alert } from '../utils/alert';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    };
  }

  _submit = () => {
    if (!this.state.currentPassword.length) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.passwordTooShort
      });
      this.currentPassword.focus();
    } else if (this.state.password.length < 6) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.passwordTooShort
      });
      this.password.focus();
    } else if (this.state.confirmPassword !== this.state.password) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.passwordNotTheSame
      });
      this.confirmPassword.focus();
    } else {
      const callback = () =>
        _alert(alertStrings.success, alertStrings.updateInfoSuccess, [
          {
            text: alertStrings.ok,
            onPress: () => this.props.navigation.goBack()
          }
        ]);
      updatePasswordAction({
        newPassword: this.state.password,
        currentPassword: this.state.currentPassword,
        callback
      });
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.changePassword}
          right={
            <TouchableOpacity onPress={this._submit}>
              <Text style={{ color: _colors.mainColor }}>{headerStrings.save}</Text>
            </TouchableOpacity>
          }
        />
        <View style={styles.innerWrapper}>
          <Text style={styles.title}>{strings.inputPassword}</Text>
          <View style={styles.hoishiWrapper}>
            <Ionicons style={styles.hoishiIcon} name="ios-lock" />
            <TextInput
              ref={ref => {
                this.currentPassword = ref;
              }}
              style={styles.hoishiInput}
              placeholder={strings.currentPassword}
              onChangeText={currentPassword => this.setState({ currentPassword })}
              returnKeyType="next"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.hoishiWrapper}>
            <Ionicons style={styles.hoishiIcon} name="ios-lock" />
            <TextInput
              ref={ref => {
                this.password = ref;
              }}
              style={styles.hoishiInput}
              placeholder={strings.password}
              onChangeText={password => this.setState({ password })}
              returnKeyType="next"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.hoishiWrapper}>
            <Ionicons style={styles.hoishiIcon} name="ios-lock" />
            <TextInput
              ref={ref => {
                this.confirmPassword = ref;
              }}
              style={styles.hoishiInput}
              placeholder={strings.rePassword}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              returnKeyType="go"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(ChangePassword);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    marginVertical: _dims.defaultPadding * 2,
    marginLeft: _dims.defaultPadding,
    color: '#555'
  },
  innerWrapper: {
    padding: _dims.defaultPadding
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
