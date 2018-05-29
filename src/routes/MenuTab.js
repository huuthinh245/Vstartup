import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { _dims, responsiveFontSize, responsiveHeight } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/menu';
import { logoutAction } from '../redux/auth/actions';
import { ApiClient } from '../swaggerApi/src';
import * as routes from './routes';

export default class MenuTab extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Header outer title={headerStrings.menuTitle} />
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.line}
          onPress={() => this.props.navigation.navigate(routes.listProject)}
        >
          <MaterialIcons style={styles.icon} name="store-mall-directory" />
          <Text style={styles.text}>{strings.project}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.line}
          onPress={() => this.props.navigation.navigate(routes.listAgency)}
        >
          <MaterialIcons style={styles.icon} name="people" />
          <Text style={styles.text}>{strings.agency}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.line}
          onPress={() => this.props.navigation.navigate(routes.listInvestor)}
        >
          <MaterialIcons style={styles.icon} name="attach-money" />
          <Text style={styles.text}>{strings.investor}</Text>
        </TouchableOpacity>

        <View style={styles.separator} />
        <TouchableOpacity style={styles.line} onPress={() => logoutAction()}>
          <MaterialIcons style={styles.icon} name="star" />
          <Text style={styles.text}>{strings.rating}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.line}>
          <MaterialIcons style={styles.icon} name="forum" />
          <Text style={styles.text}>{strings.feedback}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.line}
          onPress={() => this.props.navigation.navigate(routes.settings)}
        >
          <MaterialIcons style={styles.icon} name="settings" />
          <Text style={styles.text}>{strings.settings}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// store_mall_directory, domain, people, attack_money, star, forum, settings,
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  separator: {
    height: responsiveHeight(2),
    backgroundColor: '#eee'
  },
  line: {
    flexDirection: 'row',
    padding: _dims.defaultPadding,
    borderBottomWidth: 1,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 4),
    color: '#bce0fd'
  },
  text: {
    flex: 1,
    marginLeft: _dims.defaultPadding,
    color: '#838593'
  }
});
