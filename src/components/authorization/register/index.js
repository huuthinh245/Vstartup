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
import Overlay from '../../common/Overlay';

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
        {this.props.auth.loading && <Overlay opacity={0} />}
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
          <Customer tabLabel={headerStrings.customer} navigation={this.props.navigation} />
          <Agency tabLabel={headerStrings.agency} navigation={this.props.navigation} />
        </ScrollableTabView>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => {
            if (!this.props.auth.loading) {
              emitter.emit('registerAccount', {
                index: this.activeIndex
              });
            }
          }}
        >
          <Text style={styles.requestButtonText}>{strings.sendRequest}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(Register);
