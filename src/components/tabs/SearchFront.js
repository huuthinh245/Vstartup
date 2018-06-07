import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import Carousel from '../Carousel';

export default class SearchFront extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <Carousel isRealty {...this.props} data={this.props.mapRealty.data} />
      </View>
    );
  }
}
