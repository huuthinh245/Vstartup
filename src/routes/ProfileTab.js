import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';

import {
  responsiveFontSize,
  _dims,
  responsiveHeight,
  _colors,
  responsiveWidth
} from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import * as routes from './routes';
import Login from '../components/authorization/login';
import { _alert } from '../utils/alert';
import AgencyDetail from './AgencyDetail';
import headerStrings from '../localization/header';

class ProfileTab extends React.Component {
  _renderDropdownRow = (option, index, isSelected) => {
    let name;
    if (index === '0') name = 'ios-create-outline';
    else if (index === '1') name = 'ios-lock-outline';
    else name = 'ios-log-out-outline';

    return (
      <View style={[styles.row, index === '2' && { borderBottomWidth: 0 }]}>
        <Ionicons name={name} size={20} />
        <Text style={styles.rowText}>{option}</Text>
      </View>
    );
  };

  _drpFrame = style => {
    style.top -= 5;
    return style;
  };

  _onDropdownSelect = index => {
    if (index === '0') {
      this.props.navigation.navigate(routes.additionalInformation, {
        user: this.props.auth.user
      });
    } else if (index === '1') {
      this.props.navigation.navigate(routes.changePassword);
    } else {
      setTimeout(() => _alert('Logout', 'Are you sure ?'), 0);
    }
  };

  _renderWithAuth = () => {
    return (
      <View style={styles.wrapper}>
        <Header
          title={headerStrings.profileTitle}
          outer
          right={
            <ModalDropdown
              ref={el => {
                this._dropdown = el;
              }}
              options={['Chinh sua tai khoan', 'Change password', 'Log out']}
              dropdownStyle={styles.dropdown}
              renderRow={this._renderDropdownRow}
              renderSeparator={() => null}
              onSelect={this._onDropdownSelect}
              dropdownTextHighlightStyle={styles.highlight}
              adjustFrame={style => this._drpFrame(style)}
            >
              <TouchableOpacity onPress={() => this._dropdown.show()}>
                <Ionicons
                  name="md-more"
                  size={30}
                  color={_colors.mainColor}
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>
            </ModalDropdown>
          }
        />
        <AgencyDetail navigation={this.props.navigation} />
      </View>
    );
  };
  render() {
    return this.props.auth.token ? this._renderWithAuth() : <Login {...this.props} />;
  }
}

export default connect(state => ({ auth: state.auth }))(ProfileTab);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
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
    paddingLeft: _dims.defaultPadding
  },
  dropdown: {
    backgroundColor: 'lightblue',
    borderRadius: 4,
    height: 150
  },
  row: {
    flexDirection: 'row',
    height: 50,
    width: responsiveWidth(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'silver',
    marginHorizontal: _dims.defaultPadding
  },
  rowText: {
    flex: 1,
    marginLeft: _dims.defaultPadding,
    fontSize: 15
  },
  highlight: {
    backgroundColor: 'gold',
    color: '#fff'
  }
});
