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
import { PHONE_REGEX } from '../utils/validation';
import { updateInfoAction } from '../redux/auth/actions';

class CreateRealty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      phone: this.props.auth.user.phone,
      address: this.props.auth.user.address
    };
  }

  _validate = () => {
    if (!this.state.name) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emailInvalid
      });
      this.email.focus();
    } else if (!PHONE_REGEX.test(this.state.phone)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.phoneInvalid
      });
    } else if (!this.state.address) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.addressEmpty
      });
    } else {
      updateInfoAction(this.state);
    }
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.additionalInformation}
          right={
            <TouchableOpacity>
              <Text style={{ color: _colors.mainColor }}>{headerStrings.save}</Text>
            </TouchableOpacity>
          }
          onRightPress={() => alert(1)}
        />
        <View style={styles.innerWrapper}>
          <Text style={styles.title}>{strings.inputInfo}</Text>
          <View style={styles.hoishiWrapper}>
            <Ionicons style={styles.hoishiIcon} name="ios-contact" />
            <TextInput
              ref={ref => {
                this.name = ref;
              }}
              style={styles.hoishiInput}
              placeholder={strings.name}
              onChangeText={name => this.setState({ name })}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </View>
          <View style={styles.hoishiWrapper}>
            <Ionicons style={styles.hoishiIcon} name="ios-call" />
            <TextInput
              ref={ref => {
                this.phone = ref;
              }}
              style={styles.hoishiInput}
              placeholder={strings.phone}
              onChangeText={phone => this.setState({ phone })}
              returnKeyType="next"
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </View>
          <View style={styles.hoishiWrapper}>
            <Ionicons style={styles.hoishiIcon} name="md-pin" />
            <Text style={[styles.hoishiInput, this.state.address ? {} : { color: 'silver' }]}>
              {this.state.address || strings.address}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(CreateRealty);

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
    paddingLeft: _dims.defaultPadding
  }
});
