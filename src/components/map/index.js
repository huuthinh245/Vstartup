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
  cardTitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444'
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
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: -4,
    opacity: 0.8
  },
  bubbleHighlight: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: -6,
    opacity: 1
  },
  price: {
    color: '#000000',
    fontSize: 12,
    opacity: 0.8
  },
  priceHighlight: {
    color: '#000000',
    fontSize: 14,
    opacity: 1
  },
  icon: {
    fontSize: 24,
    alignSelf: 'center',
    opacity: 0.8
  },
  iconHighlight: {
    fontSize: 32,
    alignSelf: 'center',
    opacity: 1
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
  constructor(props) {
    super(props);
    this.state = {
      currentMarkerIndex: 0,
      animation: new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { animation, currentMarkerIndex } = this.state;

    animation.addListener(({ value }) => {
      const index = Math.floor(value / CARD_WIDTH + 0.3);
      this.setState({ currentMarkerIndex: index });

      setTimeout(() => {
        if (currentMarkerIndex !== index) {
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
            const bubbleStyle = [
              currentMarkerIndex === index ? styles.bubbleHighlight : styles.bubble,
              { borderColor: renderColor(marker.type) }
            ];
            const priceStyle = currentMarkerIndex === index ? styles.priceHighlight : styles.price;
            const iconStyle = [
              currentMarkerIndex === index ? styles.iconHighlight : styles.icon,
              { color: renderColor(marker.type) }
            ];

            return (
              <Marker
                key={marker.title}
                coordinate={marker.coordinate}
                onPress={() => console.log('index', index)}
              >
                <View style={styles.tooltip}>
                  <View style={bubbleStyle}>
                    <Text style={priceStyle}>{marker.price}</Text>
                  </View>
                  <Icon name="md-pin" style={iconStyle} />
                </View>
              </Marker>
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
                <Text numberOfLines={1} style={styles.cardTitle}>
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
