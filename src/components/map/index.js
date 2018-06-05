import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import fakeDate from './fakeData';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.8941563;
const LONGITUDE = 106.7690843;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  tooltip: {
    flexDirection: 'column',
    alignSelf: 'flex-start'
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: -4
  },
  price: {
    color: '#000000',
    fontSize: 13
  },
  icon: {
    fontSize: 24,
    alignSelf: 'center'
  }
});

const renderColor = type => {
  if (type === 'blue') {
    return '#2196F3';
  } else if (type === 'orange') {
    return '#FF9800';
  }
  return '#E91E63';
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
          <Marker onPress={() => console.log('marker pressed!')} coordinate={item.coordinate}>
            <View style={styles.tooltip}>
              <View style={[styles.bubble, { borderColor: renderColor(item.type) }]}>
                <Text style={styles.price}>{item.price}</Text>
              </View>
              <Icon name="md-pin" style={[styles.icon, { color: renderColor(item.type) }]} />
            </View>
          </Marker>
        ))}
      </MapView>
    );
  }
}
