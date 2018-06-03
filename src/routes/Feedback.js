import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';

import { _dims, _colors, responsiveFontSize } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/feedback';
import alertStrings from '../localization/alert';
import emitter from '../emitter';
import { EMAIL_REGEX, PHONE_REGEX } from '../utils/validation';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      phone: this.props.auth.user.phone,
      reason: ''
    };
  }

  _validate = () => {
    if (!this.state.email) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emailIsRequire
      });
      this.email.focus();
    } else if (!EMAIL_REGEX.test(this.state.email)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emptyField
      });
      this.email.focus();
    } else if (!PHONE_REGEX.test(this.state.phone)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.phoneInvalid
      });
      this.phone.focus();
    } else {
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Header
            onLeftPress={() => this.props.navigation.goBack()}
            title={headerStrings.feedback}
          />
          <View style={styles.wrapper}>
            <View style={styles.innerWrapper}>
              <Text style={styles.title}>{strings.nameLabel}</Text>
              <TextInput
                style={styles.input}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
                placeholder={strings.namePlaceholder}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                ref={ref => {
                  this.name = ref;
                }}
              />
              <Text style={styles.title}>{strings.emailLabel}</Text>
              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                placeholder={strings.emailPlaceholder}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                ref={ref => {
                  this.email = ref;
                }}
                style={styles.input}
              />
              <Text style={styles.title}>{strings.phoneLabel}</Text>
              <TextInput
                value={this.state.phone}
                onChangeText={phone => this.setState({ phone })}
                placeholder={strings.phonePlaceholder}
                returnKeyType="next"
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                ref={ref => {
                  this.phone = ref;
                }}
                style={styles.input}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.area.focus()}
                style={styles.textArea}
              >
                <TextInput
                  multiline
                  value={this.state.reason}
                  onChangeText={reason => this.setState({ reason })}
                  placeholder={strings.thinking}
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  ref={ref => {
                    this.area = ref;
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submit}>
              <Text style={styles.submitText}>{strings.submit}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(Feedback);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  innerWrapper: {
    flex: 1,
    paddingTop: _dims.defaultPadding,
    paddingHorizontal: _dims.defaultPadding
  },
  input: {
    marginBottom: _dims.defaultPadding
  },
  title: {
    marginLeft: _dims.defaultPadding,
    padding: 3,
    color: '#555'
  },
  textArea: {
    marginBottom: _dims.defaultPadding * 2,
    marginTop: _dims.defaultPadding,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'silver',
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10
  },
  submit: {
    backgroundColor: _colors.mainColor,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitText: {
    fontSize: responsiveFontSize(_dims.defaultFontSubTitle + 2),
    fontWeight: 'bold',
    color: '#fff'
  }
});
