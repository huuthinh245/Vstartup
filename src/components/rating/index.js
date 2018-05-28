import _ from 'lodash';

import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import Star from './Star';

export default class AirbnbRating extends Component {
  static defaultProps = {
    count: 5
  };

  constructor() {
    super();

    this.state = {
      position: 5
    };
  }

  renderStars = rating_array => {
    return _.map(rating_array, star => {
      return star;
    });
  };

  render() {
    const { position } = this.state;
    const { count } = this.props;
    const rating_array = [];

    _.times(count, index => {
      rating_array.push(
        <Star key={index} position={index + 1} fill={position >= index + 1} {...this.props} />
      );
    });

    return (
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>{this.renderStars(rating_array)}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ratingContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  reviewText: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    color: 'rgba(230, 196, 46, 1)'
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
