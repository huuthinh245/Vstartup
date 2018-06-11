import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, PixelRatio } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import { _ios, responsiveHeight, responsiveWidth } from '../utils/constants';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object
  };

  get image() {
    const { data, parallax, parallaxProps, even } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: data }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={styles.image} />
    );
  }

  render() {
    const {
      data: { title }
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          alert(`You've clicked '${title}'`);
        }}
      >
        <View style={styles.shadow} />
        <Text style={styles.count}>1/12</Text>
        <View style={styles.imageContainer}>{this.image}</View>
      </TouchableOpacity>
    );
  }
}

const slideHeight = responsiveHeight(36);
const slideWidth = responsiveWidth(75);
const itemHorizontalMargin = responsiveWidth(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;

colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const entryBorderRadius = 12;

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow,
    shadowColor: '#888',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: _ios ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: entryBorderRadius,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'silver'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'center',
    borderRadius: _ios ? entryBorderRadius : 0,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'silver'
  },
  count: {
    color: '#fff',
    width: '100%',
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: Number.MAX_SAFE_INTEGER,
    textAlign: 'center'
  }
});
