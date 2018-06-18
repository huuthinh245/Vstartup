import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.763555;
const LONGITUDE = 106.604342;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = height / 3.5;
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
    bottom: 10,
    left: 0,
    right: 0
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH
  },
  cardImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  cardIndex: {
    position: 'absolute',
    top: 6,
    left: 10,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  cardLikeIcon: {
    position: 'absolute',
    top: 6,
    right: 40,
    fontSize: 20,
    color: '#FFFFFF'
  },
  cardSharingIcon: {
    position: 'absolute',
    top: 6,
    right: 10,
    fontSize: 20,
    color: '#FFFFFF'
  },
  cardPlaceIcon: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    fontSize: 20
  },
  cardTitle: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  cardPrice: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold'
  },
  cardAddress: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400'
  },
  tooltip: {
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

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarkerIndex: 0,
      animation: new Animated.Value(0)
    };
  }
  componentDidMount() {
    const { mapRealtyData } = this.props;
    const { animation, currentMarkerIndex } = this.state;
    animation.addListener(({ value }) => {
      const index = Math.floor(value / CARD_WIDTH + 0.3);
      this.setState({ currentMarkerIndex: index });
      setTimeout(() => {
        if (currentMarkerIndex !== index) {
          const { coordinate } = mapRealtyData[index];
          this.map.animateToRegion(
            {
              latitude: coordinate.lat,
              longitude: coordinate.lng,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            },
            200
          );
        }
      }, 10);
    });
  }
  render() {
    const { animation, currentMarkerIndex } = this.state;
    const { mapRealtyData, searchRealtyData } = this.props;
    const mapRealtyDataLength = mapRealtyData.length;

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
          {mapRealtyData.map((marker, index) => {
            const priceStyle = currentMarkerIndex === index ? styles.priceHighlight : styles.price;
            const bubbleStyle = [
              currentMarkerIndex === index ? styles.bubbleHighlight : styles.bubble,
              marker.type ? { borderColor: renderColor(marker.type) } : { borderColor: '#2196F3' }
            ];
            const iconStyle = [
              currentMarkerIndex === index ? styles.iconHighlight : styles.icon,
              marker.type ? { color: renderColor(marker.type) } : { color: '#2196F3' }
            ];
            return (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.coordinate.lat,
                  longitude: marker.coordinate.lng
                }}
                onPress={() => console.log('index', index)}
              >
                <View style={styles.tooltip}>
                  <View style={bubbleStyle}>
                    <Text style={priceStyle}>{`${marker.price} ${marker.price_unit}`}</Text>
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
          {searchRealtyData.map((marker, index) => {
            const iconStyle = [
              styles.cardPlaceIcon,
              marker.type ? { color: renderColor(marker.type) } : { color: '#2196F3' }
            ];

            return (
              <View style={styles.card} key={marker.id}>
                <Image source={{ uri: marker.thumb }} style={styles.cardImage} resizeMode="cover" />
                <SimpleLineIcons name="heart" style={styles.cardLikeIcon} />
                <SimpleLineIcons name="share" style={styles.cardSharingIcon} />
                <Icon name="md-pin" style={iconStyle} />
                <Text style={styles.cardIndex}>
                  {`${index + 1}/${mapRealtyDataLength} - ${mapRealtyDataLength} hình`}
                </Text>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {marker.title}
                </Text>
                <Text style={styles.cardPrice} numberOfLines={1}>
                  {`${marker.price} ${marker.price_unit}`}
                </Text>
                <Text style={styles.cardAddress} numberOfLines={1}>
                  {marker.address}
                </Text>
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
    );
  }
}

export default Map;
