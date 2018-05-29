import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropsTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import { _colors, _dims, responsiveFontSize, responsiveHeight } from '../utils/constants';

export default class ProjectItem extends React.Component {
  static propsType = {
    selected: PropsTypes.bool,
    showPin: PropsTypes.object
  };

  static defaultProps = {
    showPin: {
      color: 'red'
    },
    selected: false
  };

  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        style={styles.wrapper}
        onLongPress={this.props.onLongPress}
        activeOpacity={0.8}
      >
        {this.props.selected && (
          <View style={styles.checkedOverlay}>
            <Ionicons name="md-checkmark-circle" style={styles.checked} />
          </View>
        )}

        <FastImage
          style={styles.image}
          source={{
            uri: data.thumb,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>1/8</Text>
          <Ionicons
            style={styles.favoriteButton}
            name={`md-heart${data.is_favorite === 1 ? '' : '-outline'}`}
          />
        </View>
        <View style={styles.infoWrapper}>
          <View style={{ flexDirection: 'row' }}>
            {this.props.showPin && (
              <Ionicons style={[styles.pin, { color: this.props.showPin.color }]} name="md-pin" />
            )}
            <Text numberOfLines={1} style={[styles.text, styles.title]}>
              {data.title}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>
            {data.price} {data.price_unit} - {data.area}
          </Text>
          <Text numberOfLines={1} style={[styles.text, styles.address]}>
            {data.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const borderRadius = 10;

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius
  },
  placeHolder: {
    borderRadius,
    height:
      responsiveHeight(10) +
      38 +
      responsiveFontSize(_dims.defaultFontTitle) +
      responsiveFontSize(_dims.defaultFontSize),
    backgroundColor: '#fff',
    padding: _dims.defaultPadding
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
    width: 30,
    alignSelf: 'center',
    position: 'absolute',
    top: _dims.defaultPadding,
    right: _dims.defaultPadding,
    fontSize: 24,
    color: 'red'
  },
  touch: {
    height: responsiveHeight(10)
  },
  infoWrapper: {
    backgroundColor: _colors.overlay,
    width: '100%',
    padding: 10,
    marginTop: responsiveHeight(10),
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius
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
    fontWeight: 'bold'
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
