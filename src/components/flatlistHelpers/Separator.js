import React from 'react';
import { View } from 'react-native';

export default class Separator extends React.Component {
  render() {
    return (
      <View style={{ height: this.props.height || 10, backgroundColor: 'transparent' }} />
    );
  }
}
