import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { responsiveFontSize, _dims, responsiveHeight, _colors } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/authorization';

export default class AdditionalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.state.params.user.name,
      phone: this.props.navigation.state.params.user.phone,
      address: this.props.navigation.state.params.user.address
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={strings.additionalInformation}
          right={
            <TouchableOpacity>
              <Text style={{ color: _colors.mainColor }}>Luu</Text>
            </TouchableOpacity>
          }
          onRightPress={() => alert(1)}
        />
        <View style={styles.innerWrapper}>
          <Text style={styles.title}>Nhap thong tin cua ban</Text>
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    marginVertical: _dims.defaultPadding * 2,
    marginLeft: _dims.defaultPadding
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
  }
});
