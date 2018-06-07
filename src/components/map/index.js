import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';

import fakeDate from './fakeData';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.8941563;
const LONGITUDE = 106.7690843;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 20;
const FAKE_DATA_LENGTH = fakeDate.lengthr;

// const styles = StyleSheet.create({
//   main: {
//     flex: 1
//   },
//   map: {
//     flex: 1
//   },
//   tooltip: {
//     flexDirection: 'column',
//     alignSelf: 'flex-start'
//   },
//   bubble: {
//     flex: 0,
//     flexDirection: 'row',
//     alignSelf: 'flex-start',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     borderRadius: 3,
//     borderWidth: 1,
//     marginBottom: -4
//   },
//   price: {
//     color: '#000000',
//     fontSize: 13
//   },
//   icon: {
//     fontSize: 24,
//     alignSelf: 'center'
//   }
// });

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  map: {
    flex: 1
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden'
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444'
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)'
  },
  markerSelected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9800'
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)'
  }
});

// const renderColor = type => {
//   if (type === 'blue') {
//     return '#2196F3';
//   } else if (type === 'orange') {
//     return '#FF9800';
//   }
//   return '#E91E63';
// };

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarkerIndex: 0,
      animation: new Animated.Value(0),
      regionTimeout: 10
    };
  }

  componentDidMount() {
    const { animation, regionTimeout, currentMarkerIndex } = this.state;
    animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index <= 0) {
        index = 0;
      }
      if (index >= FAKE_DATA_LENGTH) {
        index = FAKE_DATA_LENGTH - 1;
      }

      clearTimeout(regionTimeout);
      setTimeout(() => {
        if (currentMarkerIndex !== index) {
          this.setState({ currentMarkerIndex: index });

          const { coordinate } = fakeDate[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const { animation, currentMarkerIndex } = this.state;
    return (
      <View style={styles.main}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
          {fakeDate.map((marker, index) => {
            const opacityStyle = {
              opacity: currentMarkerIndex === index ? 1 : 0.5
            };

            return (
              <Marker.Animated
                key={marker.title}
                coordinate={marker.coordinate}
                style={[styles.marker, opacityStyle]}
              />
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {fakeDate.map(marker => (
            <View style={styles.card} key={marker.title}>
              <Image source={{ uri: marker.image }} style={styles.cardImage} resizeMode="cover" />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {marker.title}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}
