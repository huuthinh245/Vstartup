import React from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';

const STAR_IMAGE = require('./images/airbnb-star.png');
const STAR_SELECTED_IMAGE = require('./images/airbnb-star-selected.png');

const STAR_SIZE = 40;

export default class Star extends React.Component {
  constructor() {
    super();
    this.springValue = new Animated.Value(1);
  }

  spring() {
    this.springValue.setValue(1.2);

    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 2,
      tension: 1
    }).start();
  }

  render() {
    const { fill, size } = this.props;

    return (
      <TouchableOpacity activeOpacity={1} onPress={this.spring.bind(this)}>
        <Animated.Image
          source={fill ? STAR_SELECTED_IMAGE : STAR_IMAGE}
          style={[
            styles.starStyle,
            {
              width: size || STAR_SIZE,
              height: size || STAR_SIZE,
              transform: [{ scale: this.springValue }]
            }
          ]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  starStyle: {
    margin: 3
  }
});
