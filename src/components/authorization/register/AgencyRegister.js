import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import strings from '../../../localization/authorization';
import { styles } from '../login';
import emitter from '../../../emitter';
import { _dims } from '../../../utils/constants';

export default class AgencyRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rePassword: '',
      phone: '',
      address: ''
    };
  }

  componentDidMount() {
    this.event = emitter.addListener('registerAccount', index => {
      if (index.i === 1) {
        alert('not me');
      }
    });
  }

  componentWillUnmount() {
    this.event.remove();
  }

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
            style={styles.hoishiInput}
            placeholder={strings.rePassword}
            onChangeText={rePassword => this.setState({ rePassword })}
            returnKeyType="next"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="ios-call" style={styles.hoishiIcon} />
          <TextInput
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

        <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
          <Ionicons name="md-pin" style={styles.hoishiIcon} />
          <Text style={[styles.hoishiInput, !this.state.text && { color: 'silver', padding: 10 }]}>
            {this.state.text || strings.address}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
