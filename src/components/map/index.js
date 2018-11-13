import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import Awesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modalbox';
import Swiper from 'react-native-swiper';
import emitter from '../../emitter';

import * as routes from '../../routes/routes';
import {
  likeRealtyAction,
  unlikeRealtyAction
} from '../../redux/realtyDetail/actions';
import { _dims, responsiveFontSize } from '../../utils/constants';
import { getMapRealtyAction } from '../../redux/mapRealty/actions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const borderRadius = 5;
const types = ['hybrid', 'mutedStandard', 'satellite', 'standard'];

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
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
  pointer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10000,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  slider: {
    width: _dims.screenWidth * 0.8,
    alignSelf: 'center',
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
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10
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
    marginLeft: 18,
    color: '#fff'
  },
  title: {
    fontSize: responsiveFontSize(_dims.defaultFontInput),
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5
  },
  marginBottom: {
    marginBottom: 5
  },
  icon: {
    fontSize: 24,
    alignSelf: 'center',
    opacity: 0.8,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconHighlight: {
    fontSize: 32,
    alignSelf: 'center',
    opacity: 1
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  modalContents: {
    height: (_dims.screenHeight - 100) / 3,
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
});
const renderColor = type => {
  if (type === 'rent') {
    return '#2196F3';
  }
  return '#FF9800';
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
      currentMarkerSelectedId: 0,
      mapType: 0
    };
    this.currentCoords = {
      latitude: this.props.init[0],
      longitude: this.props.init[1]
    };
    this.carouselBottom = new Animated.Value(0);
  }

  componentDidMount() {
    emitter.addListener('mapFly', obj => {
      this.map.animateToCoordinate({
        latitude: obj.lat,
        longitude: obj.lng
      });
      this._toggleCarousel(0);
      this.setState({ currentMarkerSelectedId: -1 });
    });
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

  _likeRealty = async realty => {
    if (!this.props.auth.id) {
      this.props.navigation.navigate(routes.login, { modal: true });
      return;
    }
    if (realty.is_favorite) {
      unlikeRealtyAction(realty);
    } else {
      likeRealtyAction(realty);
    }
  };

  _onMarkerPress = event => {
    const { id } = event.nativeEvent;
    if (this.state.currentMarkerSelectedId === id) {
      return;
    }
    this.setState({ currentMarkerSelectedId: id });
    const index = this.props.data.findIndex(i => `${i.id}` === id);
    // this.slider.scrollBy(index, true);
    // this.slider.snapToItem(index, false);
    this._toggleCarousel(1);
  };

  _goToDetail = item => {
    this.props.navigation.navigate(routes.realtyDetail, { data: item });
  };

  _renderCarouselItem = item => {
    return (
      <TouchableOpacity
        onPress={() => this._goToDetail(item)}
        style={styles.slider}
        key={item.id}
      >
        <FastImage
          style={styles.sliderImage}
          source={{
            uri: item.thumb
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity
          onPress={() => this._likeRealty(item)}
          style={styles.heart}
        >
          <Icon
            name={item.is_favorite ? 'ios-heart' : 'ios-heart-outline'}
            size={24}
            color="tomato"
          />
        </TouchableOpacity>
        <View style={[styles.overlay, styles.bottom]}>
          <View style={styles.row}>
            <Icon name="ios-pin" size={24} color={renderColor(item.method)} />
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

  _onChangeMapView = () => {
    this.setState({ mapType: (this.state.mapType + 1) % types.length });
  };

  _requestRecenter = () => {
    const onSuccess = location => {
      this.map.animateToCoordinate(location.coords);
    };
    const onError = error => {
      alert(error.message);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  render() {
    const { currentMarkerSelectedId } = this.state;
    const { data, init } = this.props;
    const bottom = this.carouselBottom.interpolate({
      inputRange: [0, 1],
      outputRange: [-(_dims.screenHeight - 100) / 3, 0]
    });
    const { mapType } = this.state;
    const pointBackground =
      [0, 2].indexOf(mapType) > -1 ? 'rgba(255,255,255,0.8)' : '#333';

    const pointColor = [0, 2].indexOf(mapType) > -1 ? 'rgb(0,122,255)' : '#fff';

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
          showsUserLocation
          loadingEnabled
          mapType={types[this.state.mapType]}
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
        <TouchableOpacity
          onPress={this._onChangeMapView}
          style={[styles.pointer, { backgroundColor: pointBackground }]}
        >
          <Awesome name="hand-pointer-o" color={pointColor} size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this._requestRecenter}
          style={[
            styles.pointer,
            { top: 70, backgroundColor: pointBackground }
          ]}
        >
          <Icon name="ios-locate-outline" color={pointColor} size={24} />
        </TouchableOpacity>
        <Animated.View style={[styles.modal, { bottom }]}>
          {/* <Swiper
            ref={ref => {
              this.slider = ref;
            }}
            key={data.length}
            containerStyle={styles.modalContents}
            loop={false}
            showsButtons={false}
            showsPagination={false}
            showsHorizontalScrollIndicator={false}
            onIndexChanged={
              index =>
                this.setState({ currentMarkerSelectedId: `${data[index].id}` })
              // </Animated.View>this.setState({ currentMarkerSelectedId: data[index].id })
            }
          >
            {data.map(item => this._renderCarouselItem(item))}
          </Swiper> */}
        </Animated.View>
      </View>
    );
  }
}

export default Map;
