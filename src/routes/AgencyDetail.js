import React from 'react';
import { View } from 'react-native';

import Detail from '../components/AgencyDetail';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';

export default class AgencyDetail extends React.Component {
  render() {
    const { data } = this.props.navigation.state.params;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={headerStrings.agencyDetail}
          onLeftPress={() => this.props.navigation.goBack()}
        />
        <Detail navigation={this.props.navigation} user={data} />
      </View>
    );
  }
}
