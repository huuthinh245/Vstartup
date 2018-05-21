import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TouchableWithoutFeedback, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';

import strings from '../../localization/authorization';
import { styles } from './login';
import Header from '../../navigators/headers/CommonHeader';
import headerStrings from '../../localization/header';
import { _dims } from '../../utils/constants';

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

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
          <View>
            <View style={[styles.hoishiWrapper, { marginHorizontal: _dims.defaultPadding * 2 }]}>
              <Ionicons name="ios-mail" style={styles.hoishiIcon} />
              <TextInput
                style={styles.hoishiInput}
                placeholder={strings.email}
                onTextChange={email => this.setState({ email })}
                returnKeyType="go"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
              />
            </View>
            <TouchableOpacity style={styles.requestButton}>
              <Text style={styles.requestButtonText}>{strings.sendRequest}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
