import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage,
  FlatList,
  PixelRatio
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import RNRestart from 'react-native-restart';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { _dims, responsiveFontSize, responsiveHeight, _colors } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/settings';
import alertStrings from '../localization/alert';
import { _alert } from '../utils/alert';
import { languages, availableLanguages } from '../localization/setLanguage';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 1,
      currentLanguage: 1
    };
  }

  async componentWillMount() {
    const lang = await AsyncStorage.getItem('language');
    if (lang) {
      const index = availableLanguages.findIndex(item => item === lang);
      this.setState({ selectedLanguage: index, currentLanguage: index });
    }
  }

  _renderHeader = (section, index, isActive) => {
    const plus = isActive ? 6 : 2;
    const size = responsiveFontSize(_dims.defaultFontSize + plus);
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, isActive && { fontWeight: 'bold' }]}>{section.title}</Text>
        <Ionicons
          style={[
            styles.headerIcon,
            isActive && {
              transform: [{ rotate: '90deg' }]
            }
          ]}
          name="ios-arrow-forward"
          size={size}
        />
      </View>
    );
  };

  _renderContent = (section, i, isActive, sections) => {
    const _index = this.state.selectedLanguage;
    if (i === 0) {
      return (
        <FlatList
          data={languages}
          extraData={this.state}
          keyExtractor={item => item}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  this.setState({ selectedLanguage: index }, () => console.log(this.state))
                }
              >
                <Text style={styles.itemText}>{item}</Text>
                <View style={styles.itemIconWrapper}>
                  {index === _index && <Ionicons style={styles.itemIcon} name="ios-checkmark" />}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      );
    }
    return null;
  };

  _onSave = () => {
    if (this.state.currentLanguage !== this.state.selectedLanguage) {
      _alert(alertStrings.rs, alertStrings.requireRestart, [
        {
          text: alertStrings.ok,
          onPress: async () => {
            try {
              await AsyncStorage.setItem(
                'language',
                availableLanguages[this.state.selectedLanguage]
              );
              RNRestart.Restart();
            } catch (error) {
              _alert(alertStrings.error, error.message);
            }
          }
        },
        {
          text: alertStrings.cancel
        }
      ]);
    }
  };

  render() {
    const SECTIONS = [
      {
        title: strings.language,
        content: languages
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <Header
          right={
            <TouchableOpacity
              activeOpacity={this.state.currentLanguage === this.state.selectedLanguage ? 1 : 0.8}
              onPress={this._onSave}
            >
              <Text
                style={{
                  color:
                    this.state.currentLanguage !== this.state.selectedLanguage
                      ? _colors.mainColor
                      : 'gray'
                }}
              >
                {headerStrings.save}
              </Text>
            </TouchableOpacity>
          }
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.settings}
        />
        <View style={styles.wrapper}>
          <Accordion
            touchableComponent={TouchableOpacity}
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            initiallyActiveSection={2}
          />
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
    paddingVertical: _dims.defaultPadding
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
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: _dims.defaultPadding,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  itemText: {
    flex: 1,
    color: '#555',
    padding: 15,
    textAlign: 'right'
  },
  itemIconWrapper: {
    width: responsiveFontSize(_dims.defaultFontTitle + 4) + 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemIcon: {
    color: 'gray',
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 4)
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f1f9ff',
    padding: 20
  },
  headerText: {
    flex: 1,
    color: _colors.mainColor
  },
  headerIcon: {
    color: _colors.mainColor
  }
});
