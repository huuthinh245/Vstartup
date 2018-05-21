import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Customer from './CustomerRegister';
import Agency from './AgencyRegister';
import { _colors } from '../../../utils/constants';
import { styles } from '../login';
import Header from '../../../navigators/headers/CommonHeader';
import headerStrings from '../../../localization/header';
import strings from '../../../localization/authorization';
import emitter from '../../../emitter';

class Register extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          title={headerStrings.registerScreen}
          modal
          onRightPress={() => this.props.navigation.goBack()}
          containerStyle={{
            borderBottomWidth: 0.5,
            borderColor: 'silver'
          }}
        />
        <ScrollableTabView
          onChangeTab={index => {
            this.activeIndex = index;
          }}
          tabBarUnderlineStyle={{
            backgroundColor: _colors.mainColor
          }}
          tabBarBackgroundColor="#fff"
          tabBarActiveTextColor={_colors.mainColor}
          tabBarInactiveTextColor="gray"
        >
          <Customer tabLabel={headerStrings.customer} />
          <Agency tabLabel={headerStrings.agency} />
        </ScrollableTabView>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => {
            emitter.emit('registerAccount', this.activeIndex);
          }}
        >
          <Text style={styles.requestButtonText}>{strings.sendRequest}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect()(Register);
