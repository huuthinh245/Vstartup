import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import Carousel from '../Carousel';

class SearchFront extends React.Component {
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
        <Carousel isRealty {...this.props} data={this.props.listRealty.data} />
      </View>
    );
  }
}

export default connect(state => ({ listRealty: state.listRealty }))(SearchFront);
