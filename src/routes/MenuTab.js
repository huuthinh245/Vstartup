import React from 'react';
import { View } from 'react-native';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';

export default class MenuTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header outer title={headerStrings.menuTitle} />
      </View>
    );
  }
}
