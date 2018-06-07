import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Rate, { AndroidMarket } from 'react-native-rate';

import { _dims, responsiveFontSize, responsiveHeight } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/menu';
import * as routes from './routes';

export default class MenuTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header outer title={headerStrings.menuTitle} />
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.line}
            onPress={() => this.props.navigation.navigate(routes.allProject)}
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
            style={[styles.line, styles.noBorderBottom]}
            onPress={() => this.props.navigation.navigate(routes.listInvestor)}
          >
            <MaterialIcons style={styles.icon} name="attach-money" />
            <Text style={styles.text}>{strings.investor}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.line, { marginTop: _dims.defaultPadding }]}
            onPress={() => {
              const options = {
                AppleAppID: '1215027805',
                GooglePackageName: 'com.dfm.vstartup',
                OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
                preferredAndroidMarket: AndroidMarket.Google,
                preferInApp: true,
                fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html'
              };
              Rate.rate(options, (success, val) => {
                if (success) {
                  console.log(success, val);
                }
              });
            }}
          >
            <MaterialIcons style={styles.icon} name="star" />
            <Text style={styles.text}>{strings.rating}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.line}
            onPress={() => this.props.navigation.navigate(routes.feedBack)}
          >
            <MaterialIcons style={styles.icon} name="forum" />
            <Text style={styles.text}>{strings.feedback}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.line, styles.noBorderBottom]}
            onPress={() => this.props.navigation.navigate(routes.settings)}
          >
            <MaterialIcons style={styles.icon} name="settings" />
            <Text style={styles.text}>{strings.settings}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// store_mall_directory, domain, people, attack_money, star, forum, settings,
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: _dims.defaultPadding
  },
  separator: {
    height: responsiveHeight(2),
    backgroundColor: '#eee'
  },
  noBorderBottom: {
    borderBottomWidth: 0
  },
  line: {
    backgroundColor: '#fff',
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
