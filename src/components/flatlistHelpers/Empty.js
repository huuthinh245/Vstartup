import React from 'react';
import { View, Text, Image } from 'react-native';

import { responsiveWidth } from '../../utils/constants';

const img = require('../../assets/images/empty.png');

export default class Empty extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={img}
          style={{
            height: responsiveWidth(80)
          }}
          resizeMode="contain"
        />
        <Text style={{ margin: 20, color: 'gray', textAlign: 'center' }}>{this.props.title}</Text>
      </View>
    );
  }
}
