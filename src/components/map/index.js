import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import fakeDate from './fakeData';
import blueMarker from './assets/blueMarker.png';
import orangeMarker from './assets/orangeMarker.png';
import pinkMarker from './assets/pinkMarker.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.8941563;
const LONGITUDE = 106.7690843;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
});

const renderImageMarker = type => {
  if (type === 'blue') {
    return blueMarker;
  } else if (type === 'orange') {
    return orangeMarker;
  }
  return pinkMarker;
};

export default class Map extends React.Component {
  render() {
    return (
      <MapView
        style={styles.main}
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }}
      >
        {fakeDate.map(item => (
          <Marker
            onPress={() => console.log('marker pressed!')}
            coordinate={item.coordinate}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
            image={renderImageMarker(item.type)}
          />
        ))}
      </MapView>
    );
  }
}
