import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import { _dims, responsiveFontSize } from '../../utils/constants';
import { getMapRealtyAction } from '../../redux/mapRealty/actions';
import emitter from '../../emitter';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const borderRadius = 5;

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
  carousel: {
    position: 'absolute',
    height: (_dims.screenHeight - 100) / 3,
    width: _dims.screenWidth,
    zIndex: 10000
  },
  slider: {
    width: _dims.screenWidth * 0.8,
    height: (_dims.screenHeight - 100) / 3,
    borderRadius,
    backgroundColor: '#fff'
  },
  slider1: {
    overflow: 'hidden' // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  sliderImage: {
    width: _dims.screenWidth * 0.8,
    height: (_dims.screenHeight - 100) / 3,
    borderRadius,
    position: 'absolute'
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%'
  },
  top: {
    top: 0,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    alignItems: 'flex-end'
  },
  bottom: {
    bottom: 0,
    padding: 10,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    justifyContent: 'space-around'
  },
  row: {
    flexDirection: 'row'
  },
  touch: {
    padding: 10,
    marginRight: 10
  },
  text: {
    marginLeft: 24,
    color: '#fff'
  },
  title: {
    fontSize: responsiveFontSize(_dims.defaultFontInput),
    color: '#fff',
    fontWeight: 'bold'
  },
  marginBottom: {
    marginBottom: 5
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
  console.log(type);
  if (type === 'rent') {
    return '#2196F3';
  } else if (type === 'buy') {
    return '#FF9800';
  }
  return '#E91E63';
};

const calculateDistanceFromCoordinate = (fromCoords, toCoords) => {
  const deg2rad = deg => {
    return deg * (Math.PI / 180);
  };

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(toCoords.latitude - fromCoords.latitude); // deg2rad below
  const dLon = deg2rad(toCoords.longitude - fromCoords.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(fromCoords.latitude)) *
      Math.cos(deg2rad(toCoords.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarkerSelectedId: 0
    };
    this.currentCoords = {
      latitude: this.props.init[0],
      longitude: this.props.init[1]
    };
    this.carouselBottom = new Animated.Value(0);
  }

  componentDidMount() {
    emitter.addListener('mapFly', coords =>
      this.map.animateToCoordinate(coords)
    );
  }

  _toggleCarousel = toValue => {
    Animated.timing(this.carouselBottom, {
      toValue,
      duration: 250
    }).start();
  };

  _onMapPress = event => {
    if (!this.state.currentMarkerSelectedId) {
      return;
    }
    this.setState({ currentMarkerSelectedId: null });
    this._toggleCarousel(0);
  };

  _onMarkerPress = event => {
    const { id } = event.nativeEvent;
    if (this.state.currentMarkerSelectedId === id) {
      return;
    }
    this.setState({ currentMarkerSelectedId: id });
    const index = this.props.data.findIndex(i => `${i.id}` === id);
    this.slider.snapToItem(index, false);
    this._toggleCarousel(1);
  };

  _renderCarouselItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.slider} key={item.id}>
        <Image
          source={{
            uri: item.thumb
          }}
          style={styles.sliderImage}
        />
        <View style={[styles.overlay, styles.top]}>
          <TouchableOpacity style={styles.touch}>
            <Icon
              name={item.is_favorite ? 'ios-heart' : 'ios-heart-outline'}
              size={24}
              color="tomato"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottom]}>
          <View style={styles.row}>
            <Icon
              name="ios-pin"
              size={24}
              color={item.method === 'buy' ? 'tomato' : '#9c27b0'}
              style={styles.icon}
            />
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
          </View>
          <Text numberOfLines={1} style={[styles.text, styles.marginBottom]}>
            {`${item.price} ${item.price_unit}`}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _onRegionChangeComplete = coords => {
    const distance = calculateDistanceFromCoordinate(
      this.currentCoords,
      coords
    );
    this.currentCoords = coords;

    if (distance >= 2) {
      const _option = Object.assign({}, this.props.options, {
        lat: coords.latitude,
        lng: coords.longitude
      });
      getMapRealtyAction(_option);
    }
  };

  render() {
    const { currentMarkerSelectedId } = this.state;
    const { data, init } = this.props;
    // const bottom = this.carouselBottom.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-(_dims.screenHeight - 100) / 3, 20]
    // });

    return (
      <View style={styles.main}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          initialRegion={{
            latitude: init[0],
            longitude: init[1],
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          onMarkerPress={this._onMarkerPress}
          onPress={this._onMapPress}
          onRegionChangeComplete={this._onRegionChangeComplete}
        >
          {data.map(marker => {
            const iconStyle = [
              parseInt(currentMarkerSelectedId, 10) === marker.id
                ? styles.iconHighlight
                : styles.icon,
              { color: renderColor(marker.method) }
            ];
            return (
              <Marker
                key={marker.id}
                identifier={`${marker.id}`}
                coordinate={{
                  latitude: marker.coordinate.lat,
                  longitude: marker.coordinate.lng
                }}
              >
                <Icon name="md-pin" style={iconStyle} />
              </Marker>
            );
          })}
        </MapView>
        <Animated.View style={[styles.carousel, { bottom: 10 }]}>
          <Carousel
            ref={c => {
              this.slider = c;
            }}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={0.7}
            containerCustomStyle={styles.slider1}
            contentContainerCustomStyle={styles.sliderContentContainer}
            data={data}
            renderItem={this._renderCarouselItem}
            sliderWidth={_dims.screenWidth}
            itemWidth={_dims.screenWidth * 0.75}
            inactiveSlideShift={_dims.defaultPadding * 2}
            activeAnimationOptions={{
              friction: 4,
              tension: 40
            }}
            onSnapToItem={index =>
              this.setState({
                currentMarkerSelectedId: `${data[index].id}`
              })
            }
          />
        </Animated.View>
      </View>
    );
  }
}

export default Map;
