import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PixelRatio
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropsTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {
  _dims,
  _colors,
  responsiveFontSize,
  responsiveHeight
} from '../utils/constants';

export default class RealtyItem extends React.Component {
  static propsType = {
    showPin: PropsTypes.object
  };

  static defaultProps = {
    showPin: {
      color: 'tomato'
    }
  };

  render() {
    const { data, onLikeRealty } = this.props;
    return (
      <TouchableOpacity
        style={[styles.wrapper, this.props.containerStyle]}
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        <FastImage
          style={styles.image}
          source={{
            uri: data.thumb,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity onPress={onLikeRealty}>
          <Ionicons
            style={styles.favoriteButton}
            name={`ios-heart${!data.is_favorite ? '-outline' : ''}`}
          />
        </TouchableOpacity>
        <View style={styles.infoWrapper}>
          <Text numberOfLines={1} style={[styles.text, styles.title]}>
            {data.title}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {data.price} {data.price_unit} - {data.area}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {this.props.showPin && (
              <Ionicons
                style={[styles.pin, { color: this.props.showPin.color }]}
                name="md-pin"
              />
            )}
            <Text numberOfLines={1} style={[styles.text, styles.address]}>
              {data.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const borderRadius = 10;

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(192,192,192,0.5)',
    backgroundColor: '#fff',
    marginHorizontal: _dims.defaultPadding,
    height: (_dims.screenHeight - 128 - 3 * _dims.defaultPadding) / 2.5,
    shadowColor: '#333',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2
  },
  placeHolder: {
    borderRadius,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(192,192,192,0.5)',
    backgroundColor: '#fff',
    marginHorizontal: _dims.defaultPadding,
    height: (_dims.screenHeight - 128 - 3 * _dims.defaultPadding) / 2.5
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius,
    position: 'absolute',
    top: 0,
    left: 0
  },
  favoriteButton: {
    position: 'absolute',
    top: _dims.defaultPadding,
    right: _dims.defaultPadding,
    fontSize: 24,
    color: 'tomato'
  },
  touch: {
    height: responsiveHeight(10)
  },
  infoWrapper: {
    backgroundColor: _colors.overlay,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10
  },
  infoWrapperPlaceHolder: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    padding: 10,
    alignContent: 'flex-end',
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius
  },
  pin: {
    fontSize: 20,
    marginRight: 10
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 2
  },
  titleWrapper: {
    flexDirection: 'row'
  },
  title: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle)
  },
  invisible: {
    display: 'none'
  },
  address: {
    fontWeight: 'normal'
  },
  checkedOverlay: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: Number.MAX_SAFE_INTEGER,
    backgroundColor: _colors.overlay
  },
  checked: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: _colors.mainColor,
    fontSize: 36
  }
});
